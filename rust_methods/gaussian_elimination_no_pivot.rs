fn gaussian_elimination_no_pivoting(a: &mut Vec<Vec<f64>>, b: &mut Vec<f64>) -> Vec<f64> {
    let n = b.len();

    // Forward elimination (without pivoting)
    for i in 0..n {
        // Check if the diagonal element is zero, which would lead to division by zero
        if a[i][i] == 0.0 {
            panic!("Zero pivot encountered at row {}. No pivoting applied.", i);
        }

        // Eliminate entries below the pivot
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

    let solution = gaussian_elimination_no_pivoting(&mut a, &mut b);
    println!("Solution: {:?}", solution);
}
