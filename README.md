# RESTfulAPI-zhihu
仿知乎的RESTful API 学习
```
const getTree = (arr) => {
    return arr.reduce((preV, currV) => {
        preV[currV.parent_id] ? preV[currV.parent_id].push(currV) : (preV[currV.parent_id] = [currV]);
        return preV;
    }, {});
}
let tree = [];
let result = getTree(chapters);
Object.entries(result).forEach(([k, v]) => {
    v.map(item => {
        let index = Object.keys(result).find(v => item.edu_chapter_id === v);
        if (index) {
            item['children'] = result[index];
        }
    })
})
tree.push(...result[0])
```
