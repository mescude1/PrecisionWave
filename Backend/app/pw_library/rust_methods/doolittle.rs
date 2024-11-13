use nalgebra::{DMatrix, DVector};

// Doolittle Decomposition
fn doolittle_decomposition(a: &DMatrix<f64>) -> Result<(DMatrix<f64>, DMatrix<f64>), &'static str> {
    let n = a.nrows();
    let mut l = DMatrix::identity(n, n); // L starts as an identity matrix
    let mut u = DMatrix::zeros(n, n);

    for i in 0..n {
        // Calculate elements of U in the i-th row
        for j in i..n {
            u[(i, j)] = a[(i, j)] - (0..i).map(|k| l[(i, k)] * u[(k, j)]).sum::<f64>();
        }

        // Calculate elements of L in the i-th column
        for j in (i + 1)..n {
            if u[(i, i)] == 0.0 {
                return Err("Matrix is singular; zero pivot encountered.");
            }
            l[(j, i)] = (a[(j, i)] - (0..i).map(|k| l[(j, k)] * u[(k, i)]).sum::<f64>()) / u[(i, i)];
        }
    }

    Ok((l, u))
}

// Forward substitution for Ly = b
fn forward_substitution(l: &DMatrix<f64>, b: &DVector<f64>) -> DVector<f64> {
    let n = b.len();
    let mut y = DVector::zeros(n);

    for i in 0..n {
        let sum = l.row(i).columns(0, i).dot(&y.rows(0, i));
        y[i] = (b[i] - sum) / l[(i, i)];
    }

    y
}

// Backward substitution for Ux = y
fn backward_substitution(u: &DMatrix<f64>, y: &DVector<f64>) -> DVector<f64> {
    let n = y.len();
    let mut x = DVector::zeros(n);

    for i in (0..n).rev() {
        let sum = u.row(i).columns(i + 1, n - i - 1).dot(&x.rows(i + 1, n - i - 1));
        x[i] = (y[i] - sum) / u[(i, i)];
    }

    x
}

// Solving Ax = b using Doolittle decomposition
fn solve_doolittle(a: &DMatrix<f64>, b: &DVector<f64>) -> Result<(DVector<f64>, DVector<f64>, DMatrix<f64>, DMatrix<f64>), &'static str> {
    // Perform Doolittle decomposition
    let (l, u) = doolittle_decomposition(a)?;

    // Solve Ly = b for y
    let y = forward_substitution(&l, b);

    // Solve Ux = y for x
    let x = backward_substitution(&u, &y);

    Ok((x, y, l, u))
}
