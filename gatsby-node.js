const path = require('path');

const createTagPages = (createPage, posts) => {
    const allTagIndexTemplate = path.resolve('src/templates/allTagsIndex.js');
    const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js');
    const postByTag = {};

    posts.forEach(({ node }) => {
        node.frontmatter.tags.forEach(tag => {
            if (!postByTag[tag]) {
                postByTag[tag] = []
            }
            postByTag[tag].push(node)
        })
    })

    const tags = Object.keys(postByTag);
    createPage({
        path: '/tags',
        component: allTagIndexTemplate,
        context: {
            tags: tags.sort()
        }
    })

    tags.forEach(tagName => {
        const posts = postByTag[tagName];

        createPage({
            path: `/tags/${tagName}`,
            component: singleTagIndexTemplate,
            context: {
                posts,
                tagName
            }
        })
    })
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    return new Promise(function(resolve, reject) {
        const blogPostTemplate = path.resolve('src/templates/blogPost.js');

        resolve(
            graphql(`
                query {
                    allMarkdownRemark(
                        sort: {order: ASC, fields: [frontmatter___date]}
                    ){
                        edges {
                            node {
                                frontmatter {
                                    path
                                    title
                                    tags
                                }
                            }
                        }
                    }
                }
                `).then(result => {
                    const posts = result.data.allMarkdownRemark.edges;
                    createTagPages(createPage, posts);
                    posts.forEach(({ node }, index) => {
                        const path = node.frontmatter.path
                        createPage({
                            path,
                            component: blogPostTemplate,
                            context: {
                                pathSlug: path,
                                prev: index === 0 ? null : posts[index - 1].node,
                                next: index === (posts.length - 1) ? null : posts[index + 1].node
                            }
                        })

                        resolve();
                    })
                })
        )
    });
}
