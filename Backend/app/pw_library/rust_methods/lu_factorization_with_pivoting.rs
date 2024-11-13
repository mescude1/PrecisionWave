use nalgebra::{DMatrix, DVector};

// LU Factorization with Partial Pivoting
fn lu_factorization_with_pivoting(a: &DMatrix<f64>) -> Result<(DMatrix<f64>, DMatrix<f64>, DMatrix<f64>), &'static str> {
    let n = a.nrows();
    let mut l = DMatrix::identity(n, n);
    let mut u = a.clone();
    let mut p = DMatrix::identity(n, n);

    for i in 0..n {
        // Find the pivot row
        let pivot_row = (i..n).max_by(|&x, &y| u[(x, i)].abs().partial_cmp(&u[(y, i)].abs()).unwrap()).unwrap();

        // Swap rows in U and update P and L accordingly
        if pivot_row != i {
            u.swap_rows(i, pivot_row);
            p.swap_rows(i, pivot_row);
            if i > 0 {
                l.swap_rows_generic(i.into(), pivot_row.into());
            }
        }

        // Eliminate entries below the pivot
        for j in (i + 1)..n {
            if u[(i, i)] == 0.0 {
                return Err("Zero pivot encountered, matrix may be singular.");
            }

            // Calculate the multiplier and update L
            l[(j, i)] = u[(j, i)] / u[(i, i)];

            // Perform elimination
            for k in i..n {
                u[(j, k)] -= l[(j, i)] * u[(i, k)];
            }
        }
    }

    Ok((p, l, u))
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

// Solving Ax = b using LU factorization with partial pivoting
fn solve_lu_with_pivoting(a: &DMatrix<f64>, b: &DVector<f64>) -> Result<(DVector<f64>, DMatrix<f64>, DMatrix<f64>, DMatrix<f64>), &'static str> {
    // Perform LU factorization with pivoting
    let (p, l, u) = lu_factorization_with_pivoting(a)?;

    // Adjust b according to the permutation matrix P
    let pb = &p * b;

    // Solve Ly = Pb for y
    let y = forward_substitution(&l, &pb);

    // Solve Ux = y for x
    let x = backward_substitution(&u, &y);

    Ok((x, p, l, u))
}
