// This for Sample code format

db.sales.aggregate([
    // Step 1: Unwind the 'items' array to process each item individually
    {
      $unwind: "$items"
    },
    // Step 2: Project fields we are interested in
    {
      $project: {
        store: 1,
        yearMonth: { 
          $dateToString: { format: "%Y-%m", date: "$date" } 
        },
        revenue: { $multiply: ["$items.quantity", "$items.price"] },
        price: "$items.price"
      }
    },
    // Step 3: Group by store and month to calculate total revenue and average price
    {
      $group: {
        _id: { store: "$store", month: "$yearMonth" },
        totalRevenue: { $sum: "$revenue" },
        averagePrice: { $avg: "$price" }
      }
    },
    // Step 4: Sort the result by store and month in ascending order
    {
      $sort: {
        "_id.store": 1,
        "_id.month": 1
      }
    },
    // Step 5: Reshape the output to match the expected format
    {
      $project: {
        _id: 0,
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: 1
      }
    }
  ])
  