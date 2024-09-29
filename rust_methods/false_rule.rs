// Define a struct to store results for each iteration
#[derive(Debug)]
struct FalsePositionResult {
    iteration: usize,
    a: f64,
    b: f64,
    x_new: f64,
    f_x_new: f64,
    error: f64,
}

// False Position method in Rust
fn false_position<F>(
    f: F,
    mut a: f64,
    mut b: f64,
    tol: f64,
    max_iter: usize,
) -> (f64, Vec<FalsePositionResult>)
where
    F: Fn(f64) -> f64,
{
    // Check if f(a) and f(b) have opposite signs
    if f(a) * f(b) >= 0.0 {
        panic!("The function must have opposite signs at the endpoints a and b.");
    }

    // Create a Vec to store the results for each iteration
    let mut result_array: Vec<FalsePositionResult> = Vec::new();

    // False position method loop
    for i in 0..max_iter {
        // Calculate the new point using the false position formula
        let x_new = b - (f(b) * (b - a)) / (f(b) - f(a));
        let f_x_new = f(x_new);

        // Store the result of the current iteration
        let result = FalsePositionResult {
            iteration: i + 1,
            a,
            b,
            x_new,
            f_x_new,
            error: f_x_new.abs(),
        };
        result_array.push(result);

        // Check if the result is within the tolerance
        if f_x_new.abs() < tol {
            return (x_new, result_array); // Converged
        }

        // Update the interval based on the sign of f(x_new)
        if f(a) * f_x_new < 0.0 {
            b = x_new;
        } else {
            a = x_new;
        }
    }

    // If no solution is found within the given number of iterations
    panic!("Maximum number of iterations reached without convergence.");
}

fn main() {
    // Example usage of the false_position method
    let f = |x: f64| x.powi(3) - x - 2.0; // Example function f(x) = x^3 - x - 2

    let a = 1.0; // Lower bound of the interval
    let b = 2.0; // Upper bound of the interval
    let tol = 1e-6; // Tolerance for the stopping criterion
    let max_iter = 100; // Maximum number of iterations

    // Call the false_position method
    let (root, results) = false_position(f, a, b, tol, max_iter);

    // Print the root
    println!("Root: {}", root);

    // Print all results from each iteration
    println!("Results from each iteration:");
    for result in results {
        println!(
            "Iteration: {}, a: {}, b: {}, x_new: {}, f_x_new: {}, Error: {}",
            result.iteration, result.a, result.b, result.x_new, result.f_x_new, result.error
        );
    }
}
