use nalgebra::DVector;
use std::collections::HashMap;

// Newton Divided Difference Table Function
fn newton_divided_difference_table(x_values: &[f64], y_values: &[f64]) -> Result<(Vec<Vec<Option<f64>>>, String), &'static str> {
    if x_values.len() != y_values.len() {
        return Err("x_values and y_values must have the same length.");
    }

    // Number of points
    let n = x_values.len();
    let mut divided_differences = vec![y_values.to_vec()]; // First column is y-values

    // Calculate divided differences and store each column
    for i in 1..n {
        let mut column = Vec::new();
        for j in 0..(n - i) {
            let diff = (divided_differences[i - 1][j + 1] - divided_differences[i - 1][j]) / (x_values[j + i] - x_values[j]);
            column.push(diff);
        }
        divided_differences.push(column);
    }

    // Convert divided differences into a table with padding for display
    let mut table = Vec::new();
    for (i, col) in divided_differences.iter().enumerate() {
        let mut padded_column: Vec<Option<f64>> = col.iter().map(|&v| Some(v)).collect();
        padded_column.extend(vec![None; n - col.len()]);
        table.push(padded_column);
    }

    // Construct the Newton polynomial as a string
    let mut polynomial = format!("{}", divided_differences[0][0]);
    for i in 1..n {
        let mut term = format!("{}", divided_differences[i][0]);
        for j in 0..i {
            term = format!("{} * (x - {})", term, x_values[j]);
        }
        polynomial = format!("{} + {}", polynomial, term);
    }

    Ok((table, polynomial))
}
