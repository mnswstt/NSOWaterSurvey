﻿namespace VarsWebApi.Models {
    /**การผลิตสินค้า */
    export interface Factorial {
        /**ชื่อสถานประกอบการ / หน่วยงาน */
        Name: string;
    
        /**สถานประกอบการแห่งนี้ผลิตสินค้าประเภทใด */
        Category: string;
    
        /**สถานประกอบการแห่งนี้มีคนทำงานรวมทั้งหมดกี่คน */
        WorkersCount: number;
        /**สถานประกอบการแห่งนี้ใช้เครื่องจักรที่มีขนาดแรงม้าตั้งแต่ 5 แรงม้าหรือ 3,725 วัตต์ขึ้นไป หรือไม่ boolean */
        HeavyMachine: boolean;
        /**แหล่งที่มาของน้ำ */
        WaterSources: WaterSources;
        /**ในรอบ 12 เดือนที่ผ่านมาสถานประกอบการนี้มีน้ำเสียจากกระบวนการผลิตสินค้าหรือไม่ */
        // TODO:
        HasWasteWaterFromProduction: boolean;
        /**ถ้า“มี”น้้าเสีย สถานประกอบการนี้มีการจัดการน้ำเสียที่เกิดจากกระบวนการผลิตสินค้าหรือไม่   (ให้กา  ใน  เพียงข้อเดียว)  */
        HasWasteWaterTreatment: boolean;
    
        /**ในรอบ 12 เดือนที่ผ่านมา สถานประกอบการนี้มีการน้า น้ำที่ผ่านกระบวนการผลิตสินค้าแล้วกลับมาใช้ ใหม่หรือไม่  (ให้กา  ใน  เพียงข้อเดียว) */
        WasteWaterReuse: boolean;
    }
}