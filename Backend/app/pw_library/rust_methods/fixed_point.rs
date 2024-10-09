use std::f64;

fn fixed_point_method<F>(g: F, x0: f64, tol: f64, max_iter: usize) -> (f64, usize, bool, Vec<(usize, f64, f64, f64)>)
where
    F: Fn(f64) -> f64,
{
    let mut result_array = Vec::new();
    let mut x = x0;

    for i in 0..max_iter {
        let x_new = g(x);
        let error = (x_new - x).abs();

        result_array.push((i + 1, x_new, g(x_new), error));

        if error < tol {
            return (x_new, i + 1, true, result_array); // Converged
        }

        x = x_new; // Update for the next iteration
    }

    // Did not converge within max_iter
    (x, max_iter, false, result_array)
}

fn print_results(result_array: &Vec<(usize, f64, f64, f64)>) {
    println!("{:<10} {:<15} {:<15} {:<15}", "Iter", "x", "g(x)", "Error");

    for (i, x, g_x, error) in result_array {
        println!("{:<10} {:<15.8} {:<15.8} {:<15.8}", i, x, g_x, error);
    }
}

fn main() {
    // Example usage:
    let g = |x: f64| x.cos(); // Example function g(x) = cos(x)
    let x0 = 0.5; // Initial guess
    let tol = 1e-7; // Tolerance for convergence
    let max_iter = 1000; // Maximum number of iterations

    let (x, iterations, converged, result_array) = fixed_point_method(g, x0, tol, max_iter);

    println!("Fixed point: {}", x);
    println!("Iterations: {}", iterations);
    println!("Converged: {}", converged);

    // Print results in table-like format
    print_results(&result_array);
}
