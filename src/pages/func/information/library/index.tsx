import { Image, Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { cs } from "laser-utils";
import { useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { Layout } from "@/components/layout";
import { PATH } from "@/config/page";
import { App } from "@/utils/app";
import { Nav } from "@/utils/nav";
import { RegExec } from "@/utils/regex";
import { Toast } from "@/utils/toast";

import { EMPTY_COVER } from "./constant";
import styles from "./index.module.scss";
import { type BookType, requestForBooks, requestForCovers } from "./model";

export default function Index() {
  const page = useRef(1);
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [pageIndex, setPageIndex] = useState("");
  const [books, setBooks] = useState<BookType[]>([]);

  const onSearch = () => {
    if (!name) {
      Toast.info("请输入书籍信息");
      return void 0;
    }
    setLoaded(false);
    let bookListTemp: BookType[] | null = null;
    requestForBooks(name, page.current)
      .then(res => {
        if (!res) {
          Toast.info("查找失败，请重试");
          setBooks([]);
          setLoaded(false);
          return void 0;
        }
        const isbnGroup: string[] = [];
        const bookList: BookType[] = [];
        const pageInfo = RegExec.match(/[0-9][\S]*页/g, res.info);
        RegExec.match(/<li (onclick.*?>[\s\S]*?)<\/li>/g, res.info).forEach(value => {
          const isbn = RegExec.match(/isbn="(.*?)"/g, value)[0];
          const book: BookType = {
            infoList: RegExec.match(/<em>(.*?)<\/em>/g, value),
            id: RegExec.match(/javascript:bookDetail\(['"]\/opac\/m\/book\/(.*)['"]\)/g, value)[0],
            isbn: isbn ? String(/\d+/.exec(isbn.replace(/-/g, ""))) : "",
            img: EMPTY_COVER,
          };
          book.isbn && isbnGroup.push(book.isbn);
          bookList.push(book);
        });
        page.current = res.page;
        setPageIndex(pageInfo[0]);
        setBooks(bookList);
        bookListTemp = bookList;
        setLoaded(true);
        return requestForCovers(isbnGroup);
      })
      .then(res => {
        if (!res || !bookListTemp) return void 0;
        const bookList = bookListTemp;
        const next = bookList.map(book => {
          if (res[book.isbn]) return { ...book, img: res[book.isbn] };
          return book;
        });
        setBooks(next);
      });
  };

  const scrollToTop = () => {
    Taro.nextTick(() => Taro.pageScrollTo({ scrollTop: 0, duration: 0 }));
  };

  const onPrev = () => {
    const current = page.current;
    if (current <= 1) return void 0;
    page.current--;
    onSearch();
    scrollToTop();
  };

  const onNext = () => {
    page.current++;
    onSearch();
    scrollToTop();
  };

  const onViewDetail = (book: BookType) => {
    App.data.tmp.book = book;
    Nav.to(PATH.LIBRARY_DETAIL + "?id=" + book.id);
  };

  return (
    <View className={styles.container}>
      <Layout title="图书检索">
        <View className="x-center y-center a-lmt a-mb">
          <Input
            v-model="book"
            onInput={e => setName(e.detail.value)}
            className="a-input a-lmr"
          ></Input>
          <View className="a-btn a-btn-blue" onClick={onSearch}>
            检索
          </View>
        </View>
      </Layout>
      {books.map((book, index) => (
        <Layout key={index}>
          <View className="a-flex-space-between" onClick={() => onViewDetail(book)}>
            <View className="y-center a-overflow-hidden a-flex-full">
              <View className={cs(styles.img, "a-lmr a-flex-none")}>
                <Image className={cs(styles.img, "x-center y-center")} src={book.img}></Image>
              </View>
              <View className={cs(styles.bookInfo, "text-ellipsis")}>
                <View className="a-fontsize-16 text-ellipsis">
                  {book.infoList[0]?.replace(/^标题:/, "") || ""}
                </View>
                <View className="a-color-grey text-ellipsis">{book.infoList[1]}</View>
                <View className="a-color-grey text-ellipsis">{book.infoList[2]}</View>
                <View className="a-color-grey text-ellipsis">{book.infoList[3]}</View>
              </View>
            </View>
            <View className="x-center y-center a-flex-none a-ml-10 a-mr-10">
              <Icon type="arrow-right"></Icon>
            </View>
          </View>
        </Layout>
      ))}
      {loaded && (
        <Layout>
          <View className="a-flex-space-between y-center">
            <View className="y-center">
              <View className="a-btn a-btn-blue" onClick={onPrev}>
                上一页
              </View>
              <View className="a-btn a-btn-blue" onClick={onNext}>
                下一页
              </View>
            </View>
            <View className="a-color-grey">{pageIndex}</View>
          </View>
        </Layout>
      )}
    </View>
  );
}

Index.onShareAppMessage = () => void 0;
Index.onShareTimeline = () => void 0;
