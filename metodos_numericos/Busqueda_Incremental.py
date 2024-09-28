import numpy as np

def busquedas_incrementales(f, x0, h, Nmax):
    """
    Este programa encuentra un intervalo donde f(x) tiene cambio de signo
    usando el método de búsquedas incrementales.

    Entradas:
    f: función continua
    x0: punto inicial
    h: paso
    Nmax: número máximo de iteraciones

    Salidas:
    a: extremo izquierdo del intervalo
    b: extremo derecho del intervalo
    iter: número de iteraciones
    """
    # Inicialización
    xant = x0
    fant = f(xant)
    xact = xant + h
    fact = f(xact)
    
    # Ciclo
    for i in range(1, Nmax+1):
        if fant * fact < 0:
            break
        xant = xact
        fant = fact
        xact = xant + h
        fact = f(xact)

    # Entrega de resultados
    a = xant
    b = xact
    iter = i
    return a, b, iter

# Ejemplo de uso:
if __name__ == "__main__":
    # Definir la función continua f(x)
    def f(x):
        return np.sin(x)  # Puedes cambiar la función según tus necesidades
    
    # Parámetros iniciales
    x0 = 0  # Punto inicial
    h = 0.1  # Paso
    Nmax = 100  # Número máximo de iteraciones

    # Llamar a la función
    a, b, iter = busquedas_incrementales(f, x0, h, Nmax)
    print(f"Intervalo: [{a}, {b}], Iteraciones: {iter}")
