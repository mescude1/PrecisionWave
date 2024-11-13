use nalgebra::{DMatrix, DVector};
use std::f64;

// Jacobi Method
fn jacobi(a: &DMatrix<f64>, b: &DVector<f64>, x0: &DVector<f64>, tol: f64, max_iterations: usize) -> Result<(DVector<f64>, usize), &'static str> {
    let n = b.len();
    let mut x = x0.clone();
    let mut x_new = DVector::zeros(n);

    for k in 0..max_iterations {
        for i in 0..n {
            let s: f64 = (0..n)
                .filter(|&j| j != i)
                .map(|j| a[(i, j)] * x[j])
                .sum();
            x_new[i] = (b[i] - s) / a[(i, i)];
        }

        // Check for convergence
        if (&x_new - &x).norm() < tol {
            return Ok((x_new, k));
        }

        x = x_new.clone();
    }

    Err("Jacobi method did not converge within the maximum number of iterations.")
}
