use std::f64::EPSILON;

fn newton_raphson<F, DF>(f: F, df: DF, x0: f64, tol: f64, max_iter: usize) -> Option<(f64, Vec<(usize, f64, f64, f64)>)>
where
    F: Fn(f64) -> f64,
    DF: Fn(f64) -> f64,
{
    let mut xn = x0;
    let mut result_array = Vec::new();

    for n in 0..max_iter {
        let fxn = f(xn);
        let dfxn = df(xn);

        // Avoid division by zero
        if dfxn.abs() < EPSILON {
            println!("Zero derivative encountered. No solution found.");
            return None;
        }

        // Calculate the error
        let error = (xn - (xn - fxn / dfxn)).abs();

        // Append iteration details to result_array
        result_array.push((n, xn, fxn, error));

        // Check if the solution has converged
        if error < tol {
            println!("Found solution after {} iterations.", n);
            return Some((xn, result_array));
        }

        // Update xn using Newton-Raphson formula
        xn = xn - fxn / dfxn;
    }

    println!("Exceeded maximum iterations. No solution found.");
    None
}

fn main() {
    // Example function f(x) = x^2 - 2 (finding square root of 2)
    let f = |x: f64| x * x - 2.0;
    let df = |x: f64| 2.0 * x;

    let x0 = 1.0;
    let tol = 1e-7;
    let max_iter = 30;

    match newton_raphson(f, df, x0, tol, max_iter) {
        Some((root, result_array)) => {
            println!("Root: {}", root);
            println!("Iterations:");
            println!("| Iter |   x   | f(x)  | Error  |");
            println!("--------------------------------");
            for (i, xi, f_xi, e) in result_array {
                println!("| {:4} | {:5.4} | {:5.4} | {:7.4} |", i, xi, f_xi, e);
            }
        }
        None => println!("No solution found."),
    }
}
