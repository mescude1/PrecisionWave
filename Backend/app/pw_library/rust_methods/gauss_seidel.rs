use nalgebra::{DMatrix, DVector};
use std::f64;

// Gauss-Seidel Method
fn gauss_seidel(a: &DMatrix<f64>, b: &DVector<f64>, x0: &DVector<f64>, tol: f64, max_iterations: usize) -> Result<(DVector<f64>, usize, f64), &'static str> {
    let n = b.len();
    let mut x = x0.clone();

    for k in 0..max_iterations {
        let x_old = x.clone();

        for i in 0..n {
            let s1: f64 = (0..i).map(|j| a[(i, j)] * x[j]).sum();
            let s2: f64 = ((i + 1)..n).map(|j| a[(i, j)] * x_old[j]).sum();
            x[i] = (b[i] - s1 - s2) / a[(i, i)];
        }

        // Check for convergence
        let error = (&x - &x_old).norm();
        if error < tol {
            return Ok((x, k, error));
        }
    }

    Err("Gauss-Seidel method did not converge within the maximum number of iterations.")
}
