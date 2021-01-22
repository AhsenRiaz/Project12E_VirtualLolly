module.exports = {
    plugins: [
        {
            resolve: "gatsby-source-graphql",
            options: {
              // Arbitrary name for the remote schema Query type
              typeName: "Lolly",
              // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
              fieldName: "lolly",
              // Url to query from
              url: "/.netlify/functions/newLolly",
            },
          },
    ]
}