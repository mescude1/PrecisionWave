fn secant_method<F>(f: F, x0: f64, x1: f64, tol: f64, max_iter: usize) -> Result<(f64, Vec<(usize, f64, f64, f64)>), String>
where
    F: Fn(f64) -> f64,
{
    let mut x0 = x0;
    let mut x1 = x1;
    let mut result_array = Vec::new();

    for i in 0..max_iter {
        let f_x0 = f(x0);
        let f_x1 = f(x1);

        // Avoid division by zero
        if f_x1 == f_x0 {
            return Err(String::from("Division by zero encountered in the secant method."));
        }

        // Secant method formula
        let x2 = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0);

        // Check for convergence
        let error = (x2 - x1).abs();
        result_array.push((i, x1, x2, error));

        if error < tol {
            println!("Converged after {} iterations.", i + 1);
            return Ok((x2, result_array));
        }

        // Update guesses for the next iteration
        x0 = x1;
        x1 = x2;
    }

    Err(String::from("Secant method did not converge within the maximum number of iterations."))
}

fn main() {
    // Example function f(x) = x^2 - 2 (finding square root of 2)
    let f = |x: f64| x * x - 2.0;

    let x0 = 1.0;
    let x1 = 2.0;
    let tol = 1e-7;
    let max_iter = 100;

    match secant_method(f, x0, x1, tol, max_iter) {
        Ok((root, result_array)) => {
            println!("Root: {}", root);
            println!("Iterations:");
            println!("| Iter |   x_i   | f(x_i) |  Error  |");
            println!("------------------------------------");
            for (i, xi, f_xi, e) in result_array {
                println!("| {:4} | {:7.4} | {:7.4} | {:7.4} |", i, xi, f_xi, e);
            }
        }
        Err(err) => println!("{}", err),
    }
}
