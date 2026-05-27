import type { Translation } from '../types';

const zh: Translation = {
  nav: {
    home: '首页',
    products: '产品中心',
    oem: 'OEM / ODM',
    about: '关于我们',
    blog: '技术博客',
    contact: '联系我们',
    getQuote: '立即询价',
    products_sub: {
      aio: '一体机电脑',
      minipc: '迷你主机',
      monitor: '商用显示器',
      desktop: '台式主机',
    },
  },
  hero: {
    badge: '中国专业制造商 · 成立于2008年',
    title: '全球品牌值得信赖的',
    titleHighlight: '计算机硬件制造伙伴',
    subtitle:
      'BLCOOF是中国一体化计算机硬件工厂，专业生产一体机、迷你主机、商用显示器及台式机，为全球品牌提供完整的OEM/ODM定制解决方案。',
    cta1: '浏览产品',
    cta2: '获取OEM报价',
    stat1: { value: '15+', label: '年制造经验' },
    stat2: { value: '80+', label: '覆盖国家' },
    stat3: { value: '50万+', label: '年出货量' },
    stat4: { value: '200+', label: 'OEM/ODM客户' },
  },
  products: {
    title: '产品系列',
    subtitle: '从一体机到商用显示器，每款产品均符合全球性能标准，适配多元化市场需求。',
    viewAll: '查看全部产品',
    inquire: '立即询价',
    customize: '定制方案',
    learnMore: '了解更多',
    categories: {
      aio: {
        name: '一体机电脑',
        desc: '适用于办公、零售、餐饮、教育等场景的一体式台式机，Intel/AMD平台，21.5"-27" FHD/4K显示屏。',
        tag: '畅销款',
      },
      minipc: {
        name: '迷你主机',
        desc: '超紧凑迷你电脑，适用于数字标牌、信息亭、瘦客户端及嵌入式应用，支持无风扇及工业级定制。',
        tag: '热门OEM',
      },
      monitor: {
        name: '商用显示器',
        desc: '专业级商用平板显示器，适用于商业、医疗和工业场景，21"至55" IPS/VA面板，多接口支持。',
        tag: '高需求',
      },
      desktop: {
        name: '台式主机',
        desc: '面向企业工作负载、创意设计及专业计算的高性能台式电脑，支持自定义配置。',
        tag: '定制构建',
      },
    },
  },
  oem: {
    badge: 'OEM / ODM 服务',
    title: '您的品牌，',
    titleHighlight: '我们的工厂。',
    subtitle:
      '从方案设计到交付出货，我们提供全流程OEM/ODM解决方案——Logo、外壳、固件、包装，一切按您的品牌形象定制。',
    steps: {
      s1: { title: '需求沟通', desc: '告知规格、目标市场和预计数量，我们的工程师24小时内提供最优方案。' },
      s2: { title: '设计与打样', desc: '工业设计、PCB布局、BIOS定制、品牌包装，为您的目标市场量身打造。' },
      s3: { title: '认证与质检', desc: 'CE、FCC、RoHS、ENERGY STAR检测，100%烧机验证，严格品质管控。' },
      s4: { title: '量产与交付', desc: '支持500至5万+台规模量产，DDP/FOB/EXW多种贸易条款，全球物流直达。' },
    },
    cta: '启动您的OEM项目',
  },
  why: {
    title: '全球品牌选择BLCOOF的理由',
    subtitle: '15年以上制造经验积淀，服务覆盖80+国家的分销商、零售商与品牌商。',
    items: [
      { title: '源头工厂价格', desc: '直属12万平米生产基地，零中间商，为您的供应链提供最优成本效益。' },
      { title: '完整研发能力', desc: '自有硬件与固件工程团队，从原理图到量产全流程自主研发。' },
      { title: '全球认证体系', desc: 'CE、FCC、RoHS、ENERGY STAR、Windows 11 Ready及欧美澳区域认证一站到位。' },
      { title: '敏捷交期', desc: '15天出样品，30-45天量产。每个OEM客户配备专属项目经理。' },
      { title: '品质保障', desc: '六西格玛生产流程，ISO 9001:2015认证，100%烧机测试，三年质保支持。' },
      { title: '全天候响应', desc: '7×24小时售前售后技术支持，WhatsApp、微信及邮件，随时跨时区响应。' },
    ],
  },
  certifications: {
    title: '认证与合规',
    subtitle: 'BLCOOF产品满足最高国际质量与安全标准，助您无障碍进入全球市场。',
  },
  clients: {
    title: '全球合作伙伴的信赖',
    subtitle: '从欧洲分销商到中东系统集成商，听听我们的合作伙伴怎么说。',
    testimonials: [
      {
        quote: 'BLCOOF的迷你主机是我们1200家零售门店数字标牌系统的核心。品质稳定，交期无可匹敌。',
        author: 'Michael S.',
        company: 'RetailTech Solutions',
        country: '🇩🇪 德国',
      },
      {
        quote: '我们为学区定制了超过1万台带品牌Logo的一体机。BLCOOF负责CE认证、固件定制和包装设计，完美交付。',
        author: 'James R.',
        company: 'EduSystems Ltd.',
        country: '🇬🇧 英国',
      },
      {
        quote: '他们的ODM服务为我们节省了8个月的研发时间。工程团队非常专业，沟通响应及时。',
        author: 'Fatima A.',
        company: 'Gulf IT Distribution',
        country: '🇦🇪 阿联酋',
      },
      {
        quote: '极具竞争力的价格、严格的质检和专属客户经理，BLCOOF现在是我们东南亚独家硬件OEM合作商。',
        author: 'Kevin L.',
        company: 'AsiaPC Group',
        country: '🇸🇬 新加坡',
      },
    ],
  },
  blog: {
    title: '技术洞察与行业动态',
    subtitle: '来自工厂一线的硬件趋势、OEM策略及全球市场准入专业知识分享。',
    readMore: '阅读全文',
  },
  contact: {
    title: '获取免费报价',
    subtitle: '告诉我们您的项目需求，我们的销售工程师将在24小时内提供定制化方案。',
    form: {
      name: '姓名',
      email: '企业邮箱',
      company: '公司/品牌名称',
      country: '国家/地区',
      product: '意向产品',
      quantity: '预计采购数量',
      message: '项目详情与需求说明',
      submit: '提交询盘',
      success: '✅ 询盘已发送！我们的团队将在24小时内与您联系。',
    },
    info: {
      address: '中国广东省深圳市BLCOOF工业园',
      phone: '+86 755 8888 0000',
      email: 'sales@blcoof.com',
    },
  },
  footer: {
    tagline: '中国专业计算机硬件制造商 — 赋能全球品牌。',
    products: '产品',
    company: '公司',
    support: '支持',
    followUs: '关注我们',
    copyright: '© 2026 BLCOOF科技有限公司 版权所有',
    privacy: '隐私政策',
    terms: '使用条款',
  },
  floating: {
    whatsapp: 'WhatsApp咨询',
    wechat: '微信咨询',
    inquiry: '快速询盘',
  },
};

export default zh;
