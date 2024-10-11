import { Book } from './book.model';
import { Author } from './author';
import { mock, instance, when } from 'ts-mockito';

describe('Book', () => {

  // Prueba 1: Verificar que dos autores son iguales
  // Objetivo: Comprobar si el método equals de Author funciona correctamente cuando los nombres coinciden.
  // Datos de prueba: Libro con el autor 'Josh Kiszka' y comparación con el mismo nombre.
  // Resultado esperado: Debe devolver true.
  it('should check if authors are equal (valid)', () => {
    // Mockeando Author
    const mockAuthor = mock<Author>();
    when(mockAuthor.getName()).thenReturn('Josh Kiszka');
    const authorInstance = instance(mockAuthor);
    
    // Creando un libro con el mock de Author
    const book = new Book('The Battle at Garden\'s Gate', authorInstance, 4.7);
    
    // Comprobando que el autor sea correcto
    expect(book.getAuthor().equals('Josh Kiszka')).toBeTrue();
  });

  // Prueba 2: Verificar que dos autores son diferentes
  // Objetivo: Asegurarse de que el método equals de Author devuelve false cuando los nombres no coinciden.
  // Datos de prueba: Libro con el autor 'Jake Kiszka' y comparación con 'Sam Kiszka'.
  // Resultado esperado: Debe devolver false.
  it('should check if authors are different (invalid)', () => {
    // Mockeando Author
    const mockAuthor = mock<Author>();
    when(mockAuthor.getName()).thenReturn('Jake Kiszka');
    const authorInstance = instance(mockAuthor);
    
    // Creando un libro con el mock de Author
    const book = new Book('Anthem of the Peaceful Army', authorInstance, 4.8);
    
    // Comprobando que los autores no sean iguales
    expect(book.getAuthor().equals('Sam Kiszka')).toBeFalse();
  });
});
