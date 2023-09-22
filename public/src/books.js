function findAuthorById(authors=[], id=0) {
  const result = authors.find((authorObj)=>{
    return authorObj.id === id;
  })
  return result;
}

function findBookById(books=[], id=0) {
  const result = books.find((bookObj)=>{
    return bookObj.id === id;
  })
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  const notAvailable = books.filter((bookObj)=>{
    return bookObj.borrows.some((borrow)=> !borrow.returned)
  })
    const available = books.filter((bookObj)=>{
      return bookObj.borrows.every((borrow)=> borrow.returned)
})
  return [notAvailable, available]
}

function getBorrowersForBook(books, accounts) {
  const borrowers = books.borrows.map((borrow)=>{
    const account = accounts.find(account => account.id === borrow.id);
    return {...account, returned: borrow.returned}
  })
  return borrowers.slice(0,10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
