module.exports = function(app, options) {
  var remotes = app.remotes();
  // Set X-Total-Count for all search requests
  var applyXTotal = function(ctx, next) {
    var filter;
    if (ctx.args && ctx.args.filter) {
      filter = ctx.args.filter.where;
    }

    // Modify data to fullfill format asked by datatables:
    let data = ctx.result;
    ctx.result = {};
    this.count(filter, function(err, count) {
      if (err) next();
      ctx.res.set("X-Total-Count", count);
      ctx.result.data = data;
      ctx.result.count = count;
      next();
    });
  };

  var applyAdaptRequest = function(ctx, next) {
    let params = {};
    if (ctx.req.method == "GET") {
      params = ctx.req.query;
    } else if (ctx.req.method == "POST") {
      params = ctx.req.query;
    } else {
      throw new Error("Unknown method: " + ctx.req.method);
    }

    // console.log(params);
    let direction = params.ascending == 1 ? "ASC" : "DESC";
    let order = params.orderBy ? `${params.orderBy} ${direction}` : "";
    let where = {};
    if (params.filterFields && params.query != "") {
      params.filterFields.forEach(field => {
        if (!where[field]) where[field] = {};
        where[field]["regexp"] = `/.*${params.query}.*/`;
      });
    }
    ctx.args.filter = {
      skip: (params.page - 1) * params.limit,
      order: order,
      limit: params.limit,
      where: where
    };

    next();
  };

  var pattern =
    options && Array.isArray(options.pattern) ? options.pattern : ["*.find"];

  for (var i = pattern.length - 1; i >= 0; i--) {
    remotes.after(pattern[i], applyXTotal);
    remotes.before(pattern[i], applyAdaptRequest);
  }
};
