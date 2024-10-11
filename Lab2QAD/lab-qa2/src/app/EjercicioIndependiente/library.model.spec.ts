import { Book } from './book.model';
import { Author } from './author';
import { Library } from './library.model';
import { mock, instance, when, verify } from 'ts-mockito';

describe('Library', () => {

  // Prueba 1: Verificar que se puede cambiar y obtener el país del autor
  // Objetivo: Asegurarse de que los métodos setPais y getPais funcionan correctamente.
  // Datos de prueba: Autor de 'Man in the Box' con país inicial 'Reino Unido', modificado a 'Escocia'.
  // Resultado esperado: El país debe ser 'Escocia' después de usar setPais.
  it('should set and get country using setPais and getPais', () => {
    // Mockeando Author
    const mockAuthor = mock<Author>();
    when(mockAuthor.getPais()).thenReturn('Reino Unido');
    const authorInstance = instance(mockAuthor);

    // Creando un libro con el mock de Author
    const book = new Book('Man in the Box', authorInstance, 4.7);

    // Creando la biblioteca y añadiendo el libro
    const library = new Library();
    library.addBook(book);

    // Cambiando el país del autor en el mock usando setPais
    mockAuthor.setPais('Escocia');
    when(mockAuthor.getPais()).thenReturn('Escocia');

    // Verificando que el país del autor sea "Escocia"
    expect(book.getAuthor().getPais()).toBe('Escocia');
    verify(mockAuthor.setPais('Escocia')).once();
  });

  // Prueba 2: Verificar que dos autores tienen países diferentes
  // Objetivo: Asegurarse de que los métodos getPais devuelven países distintos para diferentes autores.
  // Datos de prueba: Autor de 'Rooster' de Colombia y autor de 'Them Bones' de Perú.
  // Resultado esperado: Los países deben ser diferentes ('Colombia' y 'Perú').
  it('should ensure different countries for authors', () => {
    // Mockeando dos autores
    const mockAuthor1 = mock<Author>();
    const mockAuthor2 = mock<Author>();

    when(mockAuthor1.getPais()).thenReturn('Colombia');
    when(mockAuthor2.getPais()).thenReturn('Perú');

    const authorInstance1 = instance(mockAuthor1);
    const authorInstance2 = instance(mockAuthor2);

    // Creando libros con los mocks de Author
    const book1 = new Book('Rooster', authorInstance1, 5);
    const book2 = new Book('Them Bones', authorInstance2, 4.9);

    // Creando la biblioteca y añadiendo los libros
    const library = new Library();
    library.addBook(book1);
    library.addBook(book2);

    // Verificando que los países de los autores son diferentes
    expect(book1.getAuthor().getPais()).toBe('Colombia');
    expect(book2.getAuthor().getPais()).toBe('Perú');
    verify(mockAuthor1.getPais()).once();
    verify(mockAuthor2.getPais()).once();
  });
});
