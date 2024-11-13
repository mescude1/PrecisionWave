use nalgebra::{DMatrix, DVector};

fn vandermonde_linear_regression(x: &[f64], y: &[f64], degree: usize) -> Result<(DVector<f64>, DMatrix<f64>, DVector<f64>), &'static str> {
    // Number of data points
    let n = x.len();

    // Construct the Vandermonde matrix
    let mut v = DMatrix::zeros(n, degree + 1);
    for i in 0..n {
        for j in 0..=degree {
            v[(i, j)] = x[i].powi(j as i32);
        }
    }

    // Compute V^T * V and V^T * y
    let v_transpose = v.transpose();
    let vtv = &v_transpose * &v;
    let vty = &v_transpose * DVector::from_column_slice(y);

    // Solve the system VTV * a = VTy for the coefficients a
    let a = vtv.lu().solve(&vty).ok_or("Gaussian elimination failed: Matrix may be singular")?;

    Ok((a, vtv, vty))
}
