use nalgebra::{DMatrix, DVector, ComplexField};

// Cholesky Decomposition
fn cholesky_decomposition(a: &DMatrix<ComplexField<f64>>) -> Result<DMatrix<ComplexField<f64>>, &'static str> {
    let n = a.nrows();
    let mut l = DMatrix::zeros(n, n);

    for i in 0..n {
        for j in 0..=i {
            let sum_val = (0..j).map(|k| l[(i, k)] * l[(j, k)].conj()).sum::<ComplexField<f64>>();

            if i == j {
                let value = a[(i, i)] - sum_val;
                if value.real() < 0.0 {
                    return Err("Matrix is not positive definite.");
                }
                l[(i, j)] = ComplexField::sqrt(value);
            } else {
                l[(i, j)] = (a[(i, j)] - sum_val) / l[(j, j)];
            }
        }
    }

    Ok(l)
}

// Forward substitution for Ly = b
fn forward_substitution(l: &DMatrix<ComplexField<f64>>, b: &DVector<ComplexField<f64>>) -> DVector<ComplexField<f64>> {
    let n = b.len();
    let mut y = DVector::zeros(n);

    for i in 0..n {
        let sum = l.row(i).columns(0, i).dot(&y.rows(0, i));
        y[i] = (b[i] - sum) / l[(i, i)];
    }

    y
}

// Backward substitution for L.H x = y
fn backward_substitution(l: &DMatrix<ComplexField<f64>>, y: &DVector<ComplexField<f64>>) -> DVector<ComplexField<f64>> {
    let n = y.len();
    let mut x = DVector::zeros(n);

    for i in (0..n).rev() {
        let sum = l.row(i).columns(i + 1, n - i - 1).conjugate().dot(&x.rows(i + 1, n - i - 1));
        x[i] = (y[i] - sum) / l[(i, i)].conjugate();
    }

    x
}

// Solving Ax = b using Cholesky decomposition
fn solve_cholesky(a: &DMatrix<ComplexField<f64>>, b: &DVector<ComplexField<f64>>) -> Result<(DVector<ComplexField<f64>>, DVector<ComplexField<f64>>, DMatrix<ComplexField<f64>>), &'static str> {
    // Perform Cholesky decomposition
    let l = cholesky_decomposition(a)?;

    // Solve Ly = b for y
    let y = forward_substitution(&l, b);

    // Solve L.H x = y for x
    let x = backward_substitution(&l, &y);

    Ok((x, y, l))
}
