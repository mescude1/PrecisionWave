use nalgebra::{DMatrix, DVector};

// LU Factorization without pivoting
fn lu_factorization(a: &DMatrix<f64>) -> Result<(DMatrix<f64>, DMatrix<f64>), &'static str> {
    let n = a.nrows();
    let mut l = DMatrix::identity(n, n); // Initialize L as an identity matrix
    let mut u = a.clone(); // U starts as a copy of A

    for i in 0..n {
        for j in (i + 1)..n {
            if u[(i, i)] == 0.0 {
                return Err("Zero pivot encountered; LU factorization without pivoting cannot proceed.");
            }

            // Calculate the multiplier
            l[(j, i)] = u[(j, i)] / u[(i, i)];

            // Eliminate entries below the pivot
            for k in i..n {
                u[(j, k)] -= l[(j, i)] * u[(i, k)];
            }
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

// Solving Ax = b using LU factorization
fn solve_lu(a: &DMatrix<f64>, b: &DVector<f64>) -> Result<(DVector<f64>, DMatrix<f64>, DMatrix<f64>), &'static str> {
    // Perform LU factorization
    let (l, u) = lu_factorization(a)?;

    // Solve Ly = b for y
    let y = forward_substitution(&l, b);

    // Solve Ux = y for x
    let x = backward_substitution(&u, &y);

    Ok((x, l, u))
}
