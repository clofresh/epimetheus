function(doc) {
  var result = new Document();
  result.add(doc.body, {"store":"yes"});
  result.add(doc.timestamp, {"field": "timestamp", "store":"yes"});
  return result;
}
