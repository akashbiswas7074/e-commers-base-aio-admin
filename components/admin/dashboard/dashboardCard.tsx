"use client";
import { GiTakeMyMoney } from "react-icons/gi";
import { SiProducthunt } from "react-icons/si";
import { SlHandbag } from "react-icons/sl";
import React from "react";

const DashboardCard = ({ data }: { data: any }) => {
  // Fallbacks to ensure safe access
  const orders = data?.orders || [];
  const products = data?.products || [];

  // Calculations
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalEarnings = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
  const unpaidAmount = orders
    .filter((order: any) => !order.isPaid)
    .reduce((sum: number, order: any) => sum + (order.total || 0), 0);

  return (
    <div>
      <div className="titleStyle">Dashboard</div>
      <div className="flex justify-evenly items-center">
        <div className="h-[200px] w-[200px] shadow-2xl bg-green-400 flex items-center rounded-3xl">
          <SlHandbag size={35} /> + {totalOrders} Total Orders
        </div>
        <div className="h-[200px] w-[200px] shadow-2xl bg-orange-400 flex items-center rounded-3xl">
          <SiProducthunt size={35} /> + {totalProducts} Total Products
        </div>
        <div className="h-[200px] w-[200px] shadow-2xl bg-pink-400 flex flex-col items-center rounded-3xl p-4">
          <GiTakeMyMoney size={35} />
          <div className="text-center">
            + ${totalEarnings.toFixed(2)}
            <br />
            <span>
              - ${unpaidAmount.toFixed(2)} Unpaid yet.
            </span>
            <br />
            Total Earnings
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
