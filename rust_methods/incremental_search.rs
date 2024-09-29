use std::f64::EPSILON;

// Define a struct to hold the result for each iteration
#[derive(Debug)]
struct SearchResult {
    iteration: usize,
    x_i: f64,
    f_xi: f64,
    error: f64,
}

// Function for incremental search in Rust
fn incremental_search<F>(f: F, x0: f64, h: f64, nmax: usize) -> (f64, f64, usize, Vec<SearchResult>)
where
    F: Fn(f64) -> f64,
{
    // Initialization
    let mut xant = x0;
    let mut fant = f(xant);
    let mut xact = xant + h;
    let mut fact = f(xact);

    // Create a Vec to store the results
    let mut result_array: Vec<SearchResult> = Vec::new();

    // Iteration variable
    let mut iterations = 0;

    // Loop
    for i in 1..=nmax {
        iterations = i;

        // Store the current iteration result
        let result = SearchResult {
            iteration: i,
            x_i: xact,
            f_xi: fact,
            error: (xact - xant).abs(),
        };
        result_array.push(result);

        // Check for sign change
        if fant * fact < 0.0 {
            break;
        }

        // Update
        xant = xact;
        fant = fact;
        xact = xant + h;
        fact = f(xact);

        // Stopping condition if the step size is too small
        if (xact - xant).abs() < EPSILON {
            break;
        }
    }

    // Return the result: interval endpoints, number of iterations, and the results array
    (xant, xact, iterations, result_array)
}

fn main() {
    // Example usage of the incremental_search function
    let f = |x: f64| x.powi(2) - 4.0; // Example function f(x) = x^2 - 4

    let x0 = 1.0; // Initial point
    let h = 0.5;  // Step size
    let nmax = 100; // Maximum number of iterations

    let (a, b, iter, results) = incremental_search(f, x0, h, nmax);

    println!("Interval: [{}, {}], Iterations: {}", a, b, iter);

    // Print the collected results
    println!("Results:");
    for result in results {
        println!(
            "Iteration: {}, x_i: {}, f_xi: {}, Error: {}",
            result.iteration, result.x_i, result.f_xi, result.error
        );
    }
}
