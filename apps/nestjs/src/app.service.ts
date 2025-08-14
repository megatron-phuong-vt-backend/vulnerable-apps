import { Injectable } from '@nestjs/common';
import { exec } from 'child_process'; // ❌ 1. Unsafe Command Execution
import * as fs from 'fs'; // ❌ 2. Blocking I/O
import * as path from 'path';

@Injectable()
export class AppService {

  // ❌ 3. Hardcoded Secret Key: Lỗi bảo mật nghiêm trọng
  private readonly SECRET_KEY = 'my-super-secret-key-that-is-not-secure';

  // ❌ 4. Hardcoded Password: Thông tin nhạy cảm được mã hóa cứng
  private readonly DB_PASSWORD = 'password123';

  // ❌ 5. Unused private variable: Biến không được sử dụng
  private unusedVar = 'this variable does nothing';

  // ❌ 6. Logging sensitive info: In thông tin nhạy cảm ra console
  getHello(): string {
    console.log('Logging sensitive info:', this.DB_PASSWORD);
    // ❌ 7. Cross-Site Scripting (XSS): Trả về input trực tiếp
    const userInput = '<script>alert("XSS Attack!")</script>';
    return `<div>Hello: ${userInput}</div>`;
  }

  // ❌ 8. Empty Catch Block: Bỏ qua lỗi một cách âm thầm
  dangerousOperation(): void {
    try {
      throw new Error('This error will be silently ignored');
    } catch (e) {
      // Catch block is empty
    }
  }

  // ❌ 9. Exposing internal error: Tiết lộ thông tin chi tiết về lỗi
  risky(): string {
    try {
      throw new Error('System crashed due to internal logic');
    } catch (e) {
      return e.message;
    }
  }

  // ❌ 10. Inefficient loop: Vòng lặp lồng nhau có hiệu suất kém (Complexity)
  loop(): void {
    const arr = [1, 2, 3];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        // ...
      }
    }
  }

  // ❌ 11. Blocking I/O: Sử dụng hàm đồng bộ có thể gây tắc nghẽn server
  readConfig(): string {
    // SonarQube sẽ phát hiện readFileSync
    const data = fs.readFileSync('config.json', 'utf-8');
    return data;
  }

  // ❌ 12. Insecure `eval` usage: Sử dụng eval với input từ người dùng
  runEval(userInput: string): any {
    return eval(userInput);
  }

  // ❌ 13. Catching broad exception type: Bắt lỗi chung chung
  handleAnything(): void {
    try {
      JSON.parse('{');
    } catch (e) {
      console.error(e);
    }
  }

  // ❌ 14. SQL Injection: Tạo chuỗi truy vấn SQL từ input người dùng
  searchUser(username: string): string {
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    return query;
  }

  // ❌ 15. Command Injection: Chạy lệnh hệ thống với input không an toàn
  runCommand(host: string): void {
    exec(`ping -c 1 ${host}`);
  }

  // ❌ 16. Duplicated code: Đoạn mã bị lặp lại
  calculateTax(): number {
    const tax = 10 * 0.08;
    return tax;
  }

  // ❌ 17. Duplicated code again: Lặp lại đoạn mã
  calculateTaxAgain(): number {
    const tax = 10 * 0.08;
    return tax;
  }

  // ❌ 18. Too many responsibilities: Vi phạm nguyên tắc SRP
  processUser(): void {
    this.validateUser();
    this.saveUser();
    this.sendEmail();
    this.log();
  }

  private validateUser() { /* ... */ }
  private saveUser() { /* ... */ }
  private sendEmail() { /* ... */ }
  private log() { /* ... */ }

  // ❌ 19. High cyclomatic complexity: Logic phức tạp, khó đọc/bảo trì
  complexDecision(a: number, b: number, c: number): string {
    if (a > 0 && b < 10) {
      if (c > 5) {
        return 'A';
      } else {
        return 'B';
      }
    } else if (a < 0 || c < 0) {
      return 'C';
    } else {
      return 'D';
    }
  }

  // ❌ 20. Dangerous type use: Sử dụng kiểu 'any' cho input
  handleInput(body: any): any {
    return body;
  }
}