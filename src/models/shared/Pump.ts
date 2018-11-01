namespace VarsWebApi.Models {
    /**เครื่องสูบน้้า */
    export interface Pump {
        /**เป็นเครื่องสูบน้้าอัตโนมัติ ใช่หรือไม่ (ถ้าใช่ ให้ถามเครื่องถัดไป) */
        PumpAuto: boolean;
        /**ใช้ระยะเวลาในการสูบน้้าต่อครั้งเท่าไร (ชั่วโมง)  */
        HoursPerPump: number;
        // TODO:Name, Missing
        /**ในระยะเวลา 1 ปีสูบน้้ากี่ครั้ง */
        NumberOfPumpsPerYear: number;

        /**ทราบอัตราการสูบหรือไม่ */
        HasPumpRate: boolean;

        /**มีอัตราการสูบเท่าไร (ลบ.ม./ชม.) */
        PumpRate: number | null;

        /**
         * เครื่องสูบน้้าใช้แหล่งพลังงานจากที่ใด
         * @remarks  
         * 1.ใช้ไฟฟ้า
         * 2.ใช้น้้ามันดีเซล(โซล่า)
         * 3.ใช้น้้ามันเบนซิน
         * 4.รถไถเดินตาม
         */
        // TODO:
        EnergySource: EnergySource;

        /**
         * ชนิดของเครื่องสูบ (จะโชว์ตามแหล่งพลังงานที่ตอบใน 4.5))
         * @remarks  
         * 1.ใช้ไฟฟ้า
         * 2.ใช้น้้ามันดีเซล(โซล่า)
         * 3.ใช้น้้ามันเบนซิน
         * 4.รถไถเดินตาม
         */
        // TODO: Not sure
        PumpType: PumpType;

        /**ขนาดแรงม้า / วัตต์ เท่าไร */
        HorsePower: number;

        /**ขนาดท่อดูดเท่าไร (นิ้ว/หุน/มิลลิเมตร ***ให้เลือกหน่วยได้) */
        SuctionPipeSize: number;

        /**ขนาดท่อส่งเท่าไร (นิ้ว/หุน/มิลลิเมตร ***ให้เลือกหน่วยได้) */
        PipelineSize: number;

    }
}