export default defineEventHandler((event) => {
  return {
    document: {
      data: {},
      content: [
        {
          "nodeType": "heading-1",
          "data": {},
          "content": [
            {
              "nodeType": "text",
              "value": "Bienvenue chez AJL Photos, laboratoire photographique pour particuliers et professionnels fondé en 1989 par Antoine et Jean-Luc Denoix.",
              "marks": [],
              "data": {}
            }
          ]
        },
        {
          "nodeType": "paragraph",
          "data": {},
          "content": [
            {
              "nodeType": "text",
              "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ",
              "marks": [],
              "data": {}
            },
            {
              "nodeType": "text",
              "value": "ullamco laboris nisi ut aliquip ex ea commodo consequat",
              "marks": [
                {
                  "type": "bold"
                }
              ],
              "data": {}
            },
            {
              "nodeType": "text",
              "value": ". Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              "marks": [],
              "data": {}
            }
          ]
        },
        {
          data: {},
          content: [{ data: {}, marks: [], value: 'Un autre texte un poil moins long', nodeType: 'text' }],
          nodeType: 'paragraph',
        },
      ],
      nodeType: 'document',
    },
    nodeRenderers: {},
  }
})
