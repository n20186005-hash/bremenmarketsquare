/**
 * 站点级单点配置 (single source of truth)
 * ----------------------------------------
 * 全站所有绝对 URL —— canonical / hreflang / Open Graph / JSON-LD /
 * sitemap / robots —— 必须经由 siteUrl 派生，禁止在组件/工具中硬编码域名。
 *
 * 部署时通过环境变量 CURRENT_SITE_DOMAIN 覆盖（裸域名，不含协议）。
 * 未设置时回退到默认域名，保证本地与预览环境仍可运行。
 */
const DEFAULT_DOMAIN = 'bremenmarketsquare.com';

const domain = process.env.CURRENT_SITE_DOMAIN?.trim() || DEFAULT_DOMAIN;

export const siteConfig = {
  /** 人类可读的站点/实体名称（含首页及 JSON-LD） */
  name: 'Bremen Market Square',
  /** 裸域名，不含协议 */
  domain,
} as const;

export const siteUrl = `https://${domain}`;

/** 将站内路径转换为绝对 URL（示例：absoluteUrl('/zh') ） */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
