use ndarray::{Array1, ArrayView1};

fn linear_spline_coefficients(x_vals: &ArrayView1<f64>, y_vals: &ArrayView1<f64>) -> Vec<(f64, f64)> {
    let n = x_vals.len() - 1;
    let mut coefficients = Vec::with_capacity(n);

    for i in 0..n {
        let m = (y_vals[i + 1] - y_vals[i]) / (x_vals[i + 1] - x_vals[i]);
        let b = y_vals[i] - m * x_vals[i];
        coefficients.push((m, b));
    }

    coefficients
}