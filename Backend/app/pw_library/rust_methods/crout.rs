use nalgebra::{DMatrix, DVector};

// Crout Decomposition
fn crout_decomposition(a: &DMatrix<f64>) -> Result<(DMatrix<f64>, DMatrix<f64>), &'static str> {
    let n = a.nrows();
    let mut l = DMatrix::zeros(n, n);
    let mut u = DMatrix::identity(n, n);

    for j in 0..n {
        for i in j..n {
            // Compute L[i][j]
            l[(i, j)] = a[(i, j)] - (0..j).map(|k| l[(i, k)] * u[(k, j)]).sum::<f64>();
        }

        for i in (j + 1)..n {
            // Compute U[j][i]
            if l[(j, j)] == 0.0 {
                return Err("Matrix is singular; zero pivot encountered.");
            }
            u[(j, i)] = (a[(j, i)] - (0..j).map(|k| l[(j, k)] * u[(k, i)]).sum::<f64>()) / l[(j, j)];
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

// Solving Ax = b using Crout decomposition
fn solve_crout(a: &DMatrix<f64>, b: &DVector<f64>) -> Result<(DVector<f64>, DVector<f64>, DMatrix<f64>, DMatrix<f64>), &'static str> {
    // Perform Crout decomposition
    let (l, u) = crout_decomposition(a)?;

    // Solve Ly = b for y
    let y = forward_substitution(&l, b);

    // Solve Ux = y for x
    let x = backward_substitution(&u, &y);

    Ok((x, y, l, u))
}
