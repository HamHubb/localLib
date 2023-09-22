function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = 0;

  books.forEach((book)=>{
    result += book.borrows[0].returned === false ? 1 : 0
  })
  return result;
}

function getMostCommonGenres(books) {
  const genreCount = {};
  books.forEach((book) => {
    const genre = book.genre;
    if (genreCount[genre]) {
      genreCount[genre] += 1;
    } else {
      genreCount[genre] = 1;
    }
  });
  const genreArray = [];
  for (let genre in genreCount){
    genreArray.push({ name: genre, count : genreCount[genre] })
  }
  genreArray.sort((elA, elB)=> elB.count - elA.count)
  return genreArray.slice(0,5);
}

function getMostPopularBooks(books=[]) {
  const popBooks = [];
  for (const book of books) {
    const outCount = book.borrows.length;
    const bookInfo = {
      name: book.title,
      count: outCount,
    }
    popBooks.push(bookInfo)
  }
  popBooks.sort((elA,elB)=> elB.count - elA.count);
  return popBooks.slice(0,5)
}
function helperNameFormat (first, last){
  return `${first} ${last}`
}
  
function getMostPopularAuthors(books = [], authors = []) {
  const authorBorrowCounts = {};
  for (const book of books) {
    const author = authors.find((author) => author.id === book.authorId);
    if (author) {
      const borrowCount = book.borrows.length;
      // const authorName = `${author.name.first} ${author.name.last}`;
      const authorName = helperNameFormat(author.name.first, author.name.last)
      if (authorBorrowCounts[authorName]) {
        authorBorrowCounts[authorName] += borrowCount;
      } else {
        authorBorrowCounts[authorName] = borrowCount;
      }
    }
  }

  const popularAuthors = Object.keys(authorBorrowCounts).map((authorName) => ({
    name: authorName,
    count: authorBorrowCounts[authorName],
  }));
  
  popularAuthors.sort((ela, elb) => elb.count - ela.count);

  return popularAuthors.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
