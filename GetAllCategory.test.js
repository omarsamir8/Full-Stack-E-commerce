import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useFetchCategories from "./useFetchCategories"; // استبدل بالاسم الصحيح للخطاف الخاص بك
import Category from "./src/components/Category/Category";
import { render } from "@testing-library/react";

describe("useFetchCategories", () => {
  it("fetches categories successfully", async () => {
    render(<Category />);
    const accessToken = "mock-access-token"; // استبدل بقيمة مزيفة للتوكن للاختبار
    const refreshToken = "mock-refresh-token"; // استبدل بقيمة مزيفة للتوكن للاختبار
    const mockData = { category: ["Category 1", "Category 2"] }; // بيانات مزيفة للاختبار

    // تجهيز الدالة الداخلية للاختبار
    global.fetch = jest.fn().mockResolvedValue({
      json: async () => mockData,
      ok: true,
    });

    // اختبار السلوك والحالات المتغيرة للدالة useEffect
    await /*act*/ (async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        useFetchCategories(accessToken, refreshToken)
      );

      // يجب أن يكون البيانات فارغة في البداية
      expect(result.current.allcategorys).toEqual([]);

      // انتظر حتى تنهي الدالة الداخلية للإلتقاط البيانات
      await waitForNextUpdate();

      // تأكد من تحديث الحالة بالبيانات المرجعية
      expect(result.current.allcategorys).toEqual(mockData.category);
    });
  });
});
