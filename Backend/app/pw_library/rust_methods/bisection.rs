// Define a struct to store results for each iteration
#[derive(Debug)]
struct BisectionResult {
    iteration: usize,
    x_i: f64,
    f_x_i: f64,
    error: f64,
}

// Bisection method function in Rust
fn bisection_method<F>(
    f: F,
    mut a: f64,
    mut b: f64,
    tolerance: f64,
    max_iterations: usize,
) -> (f64, usize, bool, Vec<BisectionResult>)
where
    F: Fn(f64) -> f64,
{
    // Check if f(a) and f(b) have opposite signs
    if f(a) * f(b) >= 0.0 {
        panic!("f(a) and f(b) must have opposite signs.");
    }

    // Create a Vec to store the results for each iteration
    let mut result_array: Vec<BisectionResult> = Vec::new();

    let mut c = (a + b) / 2.0; // Midpoint initialization

    // Bisection loop
    for i in 0..max_iterations {
        c = (a + b) / 2.0; // Midpoint

        // Check if the solution has converged
        if (b - a).abs() < tolerance || f(c).abs() < tolerance {
            return (c, i + 1, true, result_array); // Converged
        }

        // Narrow the interval based on the sign of f(c)
        if f(a) * f(c) < 0.0 {
            b = c; // The root is in [a, c]
        } else {
            a = c; // The root is in [c, b]
        }

        // Store the result of the current iteration
        let result = BisectionResult {
            iteration: i + 1,
            x_i: c,
            f_x_i: f(c),
            error: (b - a).abs(),
        };
        result_array.push(result);
    }

    // If the loop finishes without converging, return the last midpoint and results
    (c, max_iterations, false, result_array) // Did not converge within max_iterations
}

fn main() {
    // Example usage of the bisection method
    let f = |x: f64| x.powi(3) - x - 2.0; // Example function f(x) = x^3 - x - 2

    let a = 1.0; // Left endpoint of the interval
    let b = 2.0; // Right endpoint of the interval
    let tolerance = 1e-7; // Tolerance for stopping criterion
    let max_iterations = 1000; // Maximum number of iterations

    // Call the bisection method
    let (root, iterations, converged, results) = bisection_method(f, a, b, tolerance, max_iterations);

    // Print the results
    println!(
        "Root: {}, Iterations: {}, Converged: {}",
        root, iterations, converged
    );

    // Print all results
    println!("Results from each iteration:");
    for result in results {
        println!(
            "Iteration: {}, x_i: {}, f_x_i: {}, Error: {}",
            result.iteration, result.x_i, result.f_x_i, result.error
        );
    }
}
