use ndarray::{Array1, ArrayView1};

fn cubic_spline_coefficients(x: &ArrayView1<f64>, y: &ArrayView1<f64>, x_new: &ArrayView1<f64>) -> Array1<f64> {
    let n = x.len() - 1;
    let h = x.slice(1.., ).to_owned() - x.slice(..x.len() - 1).to_owned();
    let mut a = y.to_owned();
    let mut b = Array1::zeros(n);
    let mut c = Array1::zeros(n);
    let mut d = Array1::zeros(n);

    // Solve for coefficients using the natural boundary condition
    let mut l = Array1::zeros(n);
    let mut u = Array1::zeros(n);
    let mut z = Array1::zeros(n);

    l[0] = 1.0;
    u[0] = 0.0;
    z[0] = 0.0;

    for i in 1..n {
        l[i] = 2.0 * (x[i + 1] - x[i - 1]) - h[i - 1] * u[i - 1];
        u[i] = h[i] / l[i];
        z[i] = (y[i + 1] - y[i]) / h[i] - (y[i] - y[i - 1]) / h[i - 1];
        z[i] = (z[i] - h[i - 1] * z[i - 1]) / l[i];
    }

    l[n - 1] = 1.0;
    z[n - 1] = 0.0;
    c[n - 1] = z[n - 1];

    for i in (0..n - 1).rev() {
        c[i] = z[i] - u[i] * c[i + 1];
        b[i] = (y[i + 1] - y[i]) / h[i] - h[i] * (c[i + 1] + 2.0 * c[i]) / 3.0;
        d[i] = (c[i + 1] - c[i]) / (3.0 * h[i]);
    }

    // Interpolation
    let mut y_new = Array1::zeros(x_new.len());
    for (j, &x_val) in x_new.iter().enumerate() {
        for i in 0..n {
            if x[i] <= x_val && x_val <= x[i + 1] {
                let dx = x_val - x[i];
                y_new[j] = a[i] + b[i] * dx + c[i] * dx.powi(2) + d[i] * dx.powi(3);
                break;
            }
        }
    }

    y_new
}