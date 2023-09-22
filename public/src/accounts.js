function findAccountById(accounts, id) {
  const result = accounts.find((accountObj)=>{
    return accountObj.id === id;
  })
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((acc1, acc2)=>{
    return acc1.name.last.toLowerCase() < acc2.name.last.toLowerCase() ? -1 : 1
  })
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account;
  let total = books.reduce((acc, bookObj)=>{
    const {borrows} = bookObj;
    const filteredResult = borrows.filter((borrowObj)=>{
      return borrowObj.id === id
    })
    acc += filteredResult.length
    return acc;
  },0)
  //It returns a number that represents the number of times the account's ID appears in any book's borrows array.
  return total;
}

/*
It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it
*/

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const borrowedBooks = books.filter(book =>{
    const latestBorrow = book.borrows[0];
    return !latestBorrow.returned && latestBorrow.id === account.id
  });
  return borrowedBooks.map(book=> {
    const author = authors.find(author=> author.id === book.authorId)
    return {
      ...book,
      author,
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
