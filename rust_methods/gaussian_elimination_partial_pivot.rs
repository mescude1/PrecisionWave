fn gaussian_elimination_with_partial_pivoting(a: &mut Vec<Vec<f64>>, b: &mut Vec<f64>) -> Vec<f64> {
    let n = b.len();

    // Perform Gaussian elimination with partial pivoting
    for i in 0..n {
        // Partial Pivoting: Find the row with the largest value in the current column
        let mut max_row = i;
        for k in i + 1..n {
            if a[k][i].abs() > a[max_row][i].abs() {
                max_row = k;
            }
        }

        // Check if the matrix is singular or nearly singular
        if a[max_row][i].abs() == 0.0 {
            panic!("Matrix is singular or nearly singular");
        }

        // Swap the current row with the row having the largest pivot element
        if max_row != i {
            a.swap(i, max_row);
            b.swap(i, max_row);
        }

        // Eliminate values below the pivot
        for j in i + 1..n {
            let factor = a[j][i] / a[i][i];
            for k in i..n {
                a[j][k] -= factor * a[i][k];
            }
            b[j] -= factor * b[i];
        }
    }

    // Back substitution to solve for x
    let mut x = vec![0.0; n];
    for i in (0..n).rev() {
        x[i] = b[i];
        for j in i + 1..n {
            x[i] -= a[i][j] * x[j];
        }
        x[i] /= a[i][i];
    }

    x
}

fn main() {
    // Example usage:
    let mut a = vec![
        vec![2.0, 1.0, -1.0],
        vec![-3.0, -1.0, 2.0],
        vec![-2.0, 1.0, 2.0],
    ];
    let mut b = vec![8.0, -11.0, -3.0];

    let solution = gaussian_elimination_with_partial_pivoting(&mut a, &mut b);
    println!("Solution: {:?}", solution);
}
