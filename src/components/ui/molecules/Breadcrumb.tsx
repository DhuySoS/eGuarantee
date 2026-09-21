"use client";
import React from "react";
import Link from "next/link";
import { RightOutlined } from "@ant-design/icons";

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  separator = <RightOutlined className="text-[10px] text-gray-400" />,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`border-b border-gray-200 px-6 py-4 ${className}`}
    >
      <ol className="flex items-center gap-4 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-4">
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <span className="text-gray-500">{item.title}</span>
                </Link>
              ) : (
                <span
                  className={
                    isLast ? "font-semibold text-gray-800" : "text-gray-500"
                  }
                >
                  {item.title}
                </span>
              )}

              {!isLast && separator}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
