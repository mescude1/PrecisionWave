use ndarray::{Array1, ArrayView1};

fn quadratic_spline_coefficients(x: &ArrayView1<f64>, y: &ArrayView1<f64>, x_new: &ArrayView1<f64>) -> Array1<f64> {
    let n = x.len() - 1;
    let h = x.slice(1.., ).to_owned() - x.slice(..x.len() - 1).to_owned();
    let mut a = y.slice(..x.len() - 1).to_owned();
    let mut b = Array1::zeros(n);
    let mut c = Array1::zeros(n);

    // Solving for coefficients using the natural boundary condition
    for i in 1..n {
        c[i] = (y[i + 1] - y[i]) / h[i] - (y[i] - y[i - 1]) / h[i - 1];
    }
    c /= 2.0;

    // Calculate b coefficients
    for i in 0..n {
        b[i] = (y[i + 1] - y[i]) / h[i] - h[i] * c[i];
    }

    // Interpolation
    let mut y_new = Array1::zeros(x_new.len());
    for (j, &x_val) in x_new.iter().enumerate() {
        for i in 0..n {
            if x[i] <= x_val && x_val <= x[i + 1] {
                let dx = x_val - x[i];
                y_new[j] = a[i] + b[i] * dx + c[i] * dx.powi(2);
                break;
            }
        }
    }

    y_new
}