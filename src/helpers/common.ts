const getWindowDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const randomStr = (len: number, charSet: any): string => {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};

const convertMessageStatus = (status: string) => {
  switch (status) {
    case 'SENDING':
      return 'Đang gửi';
    case 'SUCCESS':
      return 'Thành công';
    case 'FAIL':
      return 'Thất bại';
    default:
      return null;
  }
};

const normalize = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const filterOptionSelect = (input: string, option: any) =>
  option.children
    ? normalize(option.children)
    .toLowerCase()
    .indexOf(
      normalize(input)
        .toLowerCase()
        .toString()
    ) >= 0
    : false;
// const isScrollEnded = (event: React.UIEvent<HTMLDivElement>) => {
//   const { scrollTop, offsetHeight, scrollHeight } = event.target as AnyObject;
//   return Math.abs(scrollTop + offsetHeight - scrollHeight) <= 1;
// };

const getNextPage = (
  page: number,
  pageSize: number,
  total?: number
): number | null => {
  if (typeof total === 'number' && page * pageSize >= total) return null;
  return page + 1;
};
// // check value not in: [], undefined, null, ''
// const hasValue = (value: any) => {
//   return !!_.flatten([value]).join();
// };

const isEmptyData = (v: any) => {
  return v === '' || v === undefined || v === null || (Array.isArray(v) && !v.length);
}

const pushQuery = (newQuery: Record<string, number | string>): void => {
  if (!!window?.history?.pushState) {
    const convertedQuery = Object.entries(newQuery).reduce(
      (acc: Record<string, string>, [key, value]) => {
        return {
          ...acc,
          [key]: value.toString(),
        };
      },
      {}
    );
    const query = new URLSearchParams(convertedQuery).toString();
    const subsequent = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${query}`;
    window.history.pushState({ path: subsequent }, 'Ticket System', subsequent);
  }
};

const commonHelpers = {
  getWindowDimensions,
  randomStr,
  // isScrollEnded,
  convertMessageStatus,
  filterOptionSelect,
  getNextPage,
  isEmptyData,
  pushQuery
  // hasValue,
};
export default commonHelpers;
