import numpy as np

def regla_falsa(f, a, b, tol, Nmax):
    """
    Este programa halla la solución a la ecuación f(x) = 0 en el intervalo [a, b]
    usando el método de la regla falsa.

    Entradas:
    f: función continua
    a: extremo izquierdo del intervalo inicial
    b: extremo derecho del intervalo inicial
    tol: tolerancia
    Nmax: número máximo de iteraciones

    Salidas:
    x: solución aproximada
    iter: número de iteraciones
    err: error estimado
    """
    # Inicialización
    fa = f(a)
    fb = f(b)
    pm = (fb * a - fa * b) / (fb - fa)
    fpm = f(pm)
    E = 1000  # Error inicial grande
    cont = 1  # Contador de iteraciones
    
    # Ciclo de la regla falsa
    while E > tol and cont < Nmax:
        if fa * fpm < 0:
            b = pm
            fb = fpm
        else:
            a = pm
            fa = fpm
        
        # Actualización del punto anterior
        p0 = pm
        pm = (fb * a - fa * b) / (fb - fa)
        fpm = f(pm)
        E = abs(pm - p0)
        cont += 1
    
    # Resultados
    x = pm
    iter = cont
    err = E
    return x, iter, err

# Ejemplo de uso:
if __name__ == "__main__":
    # Definir la función continua f(x)
    def f(x):
        return np.cos(x) - x  # Ejemplo: cos(x) - x, tiene una raíz en x ≈ 0.739
    
    def f1(y):
        return y**2  
    
    # Parámetros iniciales
    a = 0  # Extremo izquierdo del intervalo
    b = 1  # Extremo derecho del intervalo
    tol = 1e-5  # Tolerancia
    Nmax = 500  # Número máximo de iteraciones

    # Llamar a la función
    x, iter, err = regla_falsa(f, a, b, tol, Nmax)
    print(f"Solución aproximada: x = {x}, Iteraciones: {iter}, Error: {err}")

    c = -1
    d = 0.9  
    

    y, itery, errr = regla_falsa(f1, c, d, tol, Nmax)
    print(f"Solución aproximada: y = {y}, Iteraciones: {itery}, Error: {errr}")
