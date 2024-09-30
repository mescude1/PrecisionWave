use std::vec::Vec;

#[derive(Debug)]
struct IterationResult {
    i: usize,
    x_i: f64,
    f_xi: f64,
    df_xi: f64,
    ddf_xi: f64,
    x_next: f64,
    error: f64,
}

fn multiple_root_method(
    f: &dyn Fn(f64) -> f64,
    df: &dyn Fn(f64) -> f64,
    ddf: &dyn Fn(f64) -> f64,
    x0: f64,
    tol: f64,
    max_iter: usize,
) -> Result<(f64, usize, Vec<IterationResult>), &'static str> {
    let mut x0 = x0;
    let mut result_array: Vec<IterationResult> = Vec::new();

    for i in 0..max_iter {
        let f_x0 = f(x0);
        let df_x0 = df(x0);
        let ddf_x0 = ddf(x0);

        if df_x0.powi(2) - f_x0 * ddf_x0 == 0.0 {
            return Err("Division by zero encountered in the multiple root method.");
        }

        // Multiple Root Method formula
        let x1 = x0 - (f_x0 * df_x0) / (df_x0.powi(2) - f_x0 * ddf_x0);

        // Check for convergence
        let error = (x1 - x0).abs();

        // Store iteration details in result_array
        let result = IterationResult {
            i,
            x_i: x0,
            f_xi: f_x0,
            df_xi: df_x0,
            ddf_xi: ddf_x0,
            x_next: x1,
            error,
        };
        result_array.push(result);

        if error < tol {
            println!("Converged after {} iterations.", i + 1);
            return Ok((x1, i + 1, result_array));
        }

        // Update x0 for next iteration
        x0 = x1;
    }

    Err("Multiple root method did not converge within the maximum number of iterations.")
}

fn main() {
    // Example function: f(x) = x^3 - 3x^2 + 3x - 1 (has a root with multiplicity at x = 1)
    let f = |x: f64| x.powi(3) - 3.0 * x.powi(2) + 3.0 * x - 1.0;
    let df = |x: f64| 3.0 * x.powi(2) - 6.0 * x + 3.0; // First derivative of f(x)
    let ddf = |x: f64| 6.0 * x - 6.0;                 // Second derivative of f(x)

    let x0 = 0.5; // Initial guess
    let tol = 1e-7;
    let max_iter = 100;

    match multiple_root_method(&f, &df, &ddf, x0, tol, max_iter) {
        Ok((root, iterations, result_array)) => {
            println!("Root found: {}", root);
            println!("Number of iterations: {}", iterations);

            // Print result_array like a DataFrame
            println!("{: <4} {: <10} {: <10} {: <10} {: <10} {: <10} {: <10}",
                     "i", "x_i", "f(x_i)", "df(x_i)", "ddf(x_i)", "x_(i+1)", "Error");
            for result in result_array {
                println!("{: <4} {: <10.6} {: <10.6} {: <10.6} {: <10.6} {: <10.6} {: <10.6}",
                         result.i, result.x_i, result.f_xi, result.df_xi, result.ddf_xi, result.x_next, result.error);
            }
        }
        Err(e) => {
            println!("{}", e);
        }
    }
}
