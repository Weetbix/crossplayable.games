import { GatsbyNode } from "gatsby"

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  const avengers = [
    {
      firstName: "Tony",
      lastName: "Stark",
      name: "Iron Man",
    },
    {
      firstName: "Bruce",
      lastName: "Banner",
      name: "Hulk",
    },
    {
      firstName: "Thor",
      lastName: "Odinson",
      name: "Thor",
    },
    {
      firstName: "Steve",
      lastName: "Rogers",
      name: "Captain America",
    },
    {
      firstName: "Natasha",
      lastName: "Romanoff",
      name: "Black Widow",
    },
    {
      firstName: "Clint",
      lastName: "Barton",
      name: "Hawkeye",
    },
  ]

  return avengers.map(avenger =>
    createNode({
      ...avenger,
      id: createNodeId(avenger.name),
      internal: {
        type: `Avenger`,
        contentDigest: createContentDigest(avenger),
      },
    })
  )
}
