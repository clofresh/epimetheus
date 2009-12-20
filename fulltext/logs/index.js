function(doc) {
  var result = new Document();
  result.add(doc.body, {"store":"yes"});
  return result;
}
