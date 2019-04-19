module.exports = function (app, options) {
  var remotes = app.remotes();
  // Set X-Total-Count for all search requests
  var applyXTotal = function (ctx, next) {
    var filter;
    if (ctx.args && ctx.args.filter) {
      filter = ctx.args.filter.where;
    }

    // Modify data to fullfill format asked by datatables:
    let data = ctx.result
    ctx.result = {}
    this.count(filter, function (err, count) {
      if (err) next();
      ctx.res.set('X-Total-Count', count);
      ctx.result.data = data
      ctx.result.count = count
      next();
    });
  };
  var pattern = options && Array.isArray(options.pattern) ? options.pattern : ['*.find'];

  for (var i = pattern.length - 1; i >= 0; i--) {
    remotes.after(pattern[i], applyXTotal);
  }
};
