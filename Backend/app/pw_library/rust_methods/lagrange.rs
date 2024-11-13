use ndarray::{Array1, Array2, ArrayView1};
use num_complex::Complex64;
use sympy::{Symbol, sympify, Expr, simplify};

fn lagrange_polynomial(x_values: &ArrayView1<f64>, y_values: &ArrayView1<f64>) -> Expr {
    if x_values.len() != y_values.len() {
        panic!("x_values and y_values must have the same length.");
    }

    let n = x_values.len();
    let x = Symbol::from("x");
    let mut polynomial = Expr::from(0);

    for i in 0..n {
        let mut term = y_values[i];
        for j in 0..n {
            if j != i {
                term *= (x.clone() - x_values[j]) / (x_values[i] - x_values[j]);
            }
        }
        polynomial += term;
    }

    simplify(polynomial)
}