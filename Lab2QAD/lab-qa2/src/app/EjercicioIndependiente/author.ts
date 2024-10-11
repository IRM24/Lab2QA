export interface Author {
    // Compara por el nombre si dos autores son iguales
    equals(name: string): boolean;

    // Inicializa el nombre
    setName(name: string): void;

    // Devuelve el nombre
    getName(): string;

    // Inicializa el país
    setPais(pais: string): void;

    // Devuelve el país
    getPais(): string;
    
}
