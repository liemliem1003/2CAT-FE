import { Component, Injectable, Input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Injectable({
  providedIn: 'root' // This makes the service available globally
})



@Component({
  selector: 'app-qrgenerator',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qrgenerator.component.html',
  styleUrl: './qrgenerator.component.scss'
})
export class QRgeneratorComponent {
  @Input() bankAccount = '0827333352'
  @Input() bankID = '970422'
  @Input() amount = 0
  @Input() addtionalInformation = 'test'

  constructor(private qrcode: QRCodeModule) { }
  ngOnInit() {

  }
  CreateStringForQR() {

    const PayloadFormatIndicator = "000201"
    const PointOfInitiationMethod = "010212"
    var ConsumerAccountInformation = ReturnConsumerAccountInformation(this.bankID, this.bankAccount)
    const TransactionCurrency = "5303704"
    var TransactionAmount = ReturnString("54", JSON.stringify(this.amount))
    const CountryCode = "5802VN"
    // var AdditionalDataFieldTemplate = ReturnString("62", "0107NPS68690819thanh toan don hang")
    var AdditionalDataFieldTemplate = ReturnString("62", "0107NPS6869" + ReturnString("08",this.addtionalInformation))
    var CRC = "6304"

    function ReturnConsumerAccountInformation(bankAccount: string, bankID: string) {
      const GloballyUniqueIdentifier = ReturnString("00", "A000000727")
      var strForBankAccount = ReturnString("01", ReturnString("00", bankAccount) + ReturnString("01", bankID))
      const serviceCode = ReturnString("02", "QRIBFTTA")
      var str = GloballyUniqueIdentifier + strForBankAccount + serviceCode
      return ReturnString("38", str)
    }
    function crc16CCITT(input: string) {
      const crcTable = [];
      let crc = 0xFFFF;
      
      // Generate CRC table
      for (let i = 0; i < 256; i++) {
        let crcValue = i << 8;
        for (let j = 0; j < 8; j++) {
          if ((crcValue & 0x8000) !== 0) {
            crcValue = (crcValue << 1) ^ 0x1021;
          } else {
            crcValue = crcValue << 1;
          }
        }
        crcTable[i] = crcValue & 0xFFFF;
      }

      // Calculate CRC
      for (let i = 0; i < input.length; i++) {
        const byte = input.charCodeAt(i);
        const index = ((crc >> 8) ^ byte) & 0xFF;
        crc = ((crc << 8) ^ crcTable[index]) & 0xFFFF;
      }
      return crc.toString(16).toUpperCase();
    }

    function ReturnString(code: string, value: string) {
      var length = value.length
      if (value.length < 10) {
        var strLength = "0" + length
        return `${code}${strLength}${value}`
      }
      return `${code}${length}${value}`
    }
    var str = PayloadFormatIndicator + PointOfInitiationMethod + ConsumerAccountInformation + TransactionCurrency + TransactionAmount + CountryCode + AdditionalDataFieldTemplate + CRC
    
    var finalString = str+crc16CCITT(str)
    return finalString
  }

}

// import { Component, Injectable, Input } from '@angular/core';
// import { QRCodeModule } from 'angularx-qrcode';

// @Injectable({
//   providedIn: 'root' // This makes the service available globally
// })



// @Component({
//   selector: 'app-qrgenerator',
//   standalone: true,
//   imports: [QRCodeModule],
//   templateUrl: './qrgenerator.component.html',
//   styleUrl: './qrgenerator.component.scss'
// })
// export class QRgeneratorComponent {
//   @Input() bankAccount = ''
//   @Input() item = ''

//   constructor(private qrcode: QRCodeModule) { }
//   ngOnInit() {

//   }
//   CreateStringForQR() {

//     const PayloadFormatIndicator = "000201"
//     const PointOfInitiationMethod = "010212"
//     var ConsumerAccountInformation = ReturnConsumerAccountInformation("970403", "0011012345678")
//     const TransactionCurrency = "5303704"
//     var TransactionAmount = ReturnString("54", "180000")
//     const CountryCode = "5802VN"
//     var AdditionalDataFieldTemplate = ReturnString("62", "0107NPS68690819thanh toan don hang")
//     var CRC = "6304"

//     function ReturnConsumerAccountInformation(bankAccount: string, bankID: string) {
//       const GloballyUniqueIdentifier = ReturnString("00", "A000000727")
//       var strForBankAccount = ReturnString("01", ReturnString("00", bankAccount) + ReturnString("01", bankID))
//       const serviceCode = ReturnString("02", "QRIBFTTA")
//       var str = GloballyUniqueIdentifier + strForBankAccount + serviceCode
//       return ReturnString("38", str)
//     }
//     function crc16CCITT(input: string) {
//       const crcTable = [];
//       let crc = 0xFFFF;
      
//       // Generate CRC table
//       for (let i = 0; i < 256; i++) {
//         let crcValue = i << 8;
//         for (let j = 0; j < 8; j++) {
//           if ((crcValue & 0x8000) !== 0) {
//             crcValue = (crcValue << 1) ^ 0x1021;
//           } else {
//             crcValue = crcValue << 1;
//           }
//         }
//         crcTable[i] = crcValue & 0xFFFF;
//       }

//       // Calculate CRC
//       for (let i = 0; i < input.length; i++) {
//         const byte = input.charCodeAt(i);
//         const index = ((crc >> 8) ^ byte) & 0xFF;
//         crc = ((crc << 8) ^ crcTable[index]) & 0xFFFF;
//       }
//       return crc.toString(16).toUpperCase();
//     }

//     function ReturnString(code: string, value: string) {
//       var length = value.length
//       if (value.length < 10) {
//         var strLength = "0" + length
//         return `${code}${strLength}${value}`
//       }
//       return `${code}${length}${value}`
//     }
//     var str = PayloadFormatIndicator + PointOfInitiationMethod + ConsumerAccountInformation + TransactionCurrency + TransactionAmount + CountryCode + AdditionalDataFieldTemplate + CRC
    
//     var finalString = str+crc16CCITT(str)
//     return finalString
//   }

// }

