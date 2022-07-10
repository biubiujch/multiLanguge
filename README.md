# 多语言平台

## 前端实现翻译的方式

### 分键值对处理不同的语言

通常来说，我们需要对每一种语言做单独的处理，理想情况下，就是对每一种语言，都维护一个键值对的数据。以中文和英文为例。看中文的例子

```typescript
const zh = {
  name: "姓名"，
  age: "年龄"
}

const App = () => {
  return <div>
    <p>{zh.name}</p>
    <p>{zh.age}</p>
  </div>
}
```

这个时候，如果我们需要支持英文，那么就需要把键值对的数据做一个翻译

```typescript
const en = {
  name: "Name"，
  age: "Hight"
}

const App = () => {
  return <div>
    <p>{en.name}</p>
    <p>{en.age}</p>
  </div>
}
```

### 合并键值对

上例中很容易发现，这样处理的话，切换语言的时候怎么切换键值对呢？很容易，根据不同语言的 `key`，来动态区分。
这个 `key` ，比如中文，上例的变量名 `zh` 和 英文的 `en`，就是这里说的 `key`，那么合并起来处理，就是这样的：

```typescript
const zh = {
  name: "姓名"，
  age: "身高"
}

const en = {
  name: "Name"，
  age: "Hight"
}

// 合并每个语言的键值对数据
const text = {
  zh,
  en
}

const App = () => {
  const [lang] = useState<'zh' | 'en'>('zh')

  return <div>
    <p>{text[lang].name}</p>
    <p>{text[lang].age}</p>
  </div>
}
```

这里使用一个 `lange` 的状态，来决定最后根据什么语言类型来渲染。

## 前端处理的局限性与解决方案

### 局限性

上述中最后发现，通过一个简单的合并处理，就实现了切换语言的功能。但是随着迭代时间越来越长，就会有一下几个问题：

- 键值对数据太多，维护成本高（实际业务场景，很容易出现几百个文案的 key）
- 文案的运营压力在前端这一侧，并且不能摆脱出来由运营同事来维护

### 理想方案

最理想的情况就是，所有的文案数据，可以不用前端来维护。通过一个请求或者资源链接，可以把这些文案全部都加载到前端。语言的切换，可以给平台赋能。以上述例子来说：

```typescript
const zh = {
  name: "姓名"，
  age: "身高"
}

const en = {
  name: "Name"，
  age: "Hight"
}

// 合并每个语言的键值对数据
const text = {
  zh,
  en
}

const App = () => {
  const [lang] = useState<'zh' | 'en'>('zh')

  return <div>
    <p>{text[lang].name}</p>
    <p>{text[lang].age}</p>
  </div>
}
```

到这一步，基础的逻辑实现了，但是要在所有组件里面用起来，就需要在根组件上，包装一个 `Provider`，并提供切换语言的 `hook` 例如：

```typescript
const zh = {
  name: "姓名"，
  age: "身高"
}

const en = {
  name: "Name"，
  age: "Hight"
}

const text = {
  zh,
  en
}

const Context = React.createContext({ lang: "zh", setLang: () => void });

const useLang = () => {
  const { lang, setLang } = useContext(Context);

  // 根据当前的 lang 和对应的文案 key，来获取最终要展示的文案
  const t = (key: string) => text[lang][key];

  return {
    t,
    lang,
    setLang,
  }
}

const Child = () => {
  const { t } = useLang();
  return <p>{t('name')}</p>
}

const App = () => {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  return (
    <Context.Provider value={{ lange, setLang }}>
      <Child />
    </Context.Provider>
  );
};
```

理想方案就是，在 `useLang` 里，关于 `text` 的一个大 `json` 数据是请求过来的。并且这些文案，可以托管到某个平台上维护，解放前端生产力

## 服务端需要具备的能力

多语言的托管，可以对应为是为一个企业的项目合作，整体上也就是 2B 的业务。服务端需要具备的功能有：

- 登录、注册、退出

- 项目管理
  - 创建项目
  - 更新项目
  - 删除项目
  - 成员管理
    - 添加成员（可以设定哪个成员审批文案修改申请，默认是项目管理员，可添加多个）
    - 移除成员
- 项目维护
  - 查看文案的列表
  - 新增文案
  - 翻译文案
  - 修改文案
  - 删除文案
- 项目运营
  - 可以根据一个客户端的请求，把客户端需要的文案数据都返回过去

## 客户端需要实现的页面

- 登录注册
- 账号主页，显示项目列表
- 项目
  - 文案列表
  - 设置
