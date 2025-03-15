"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CreditCard,
  Globe,
  Mail,
  MessageSquare,
  Save,
  Settings,
  ShieldAlert,
  Truck,
  Upload,
  Users,
  Download,
} from "lucide-react"
import Image from "next/image"

export default function AdminSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "ASOS Style Shop",
    storeEmail: "contact@asosstyle.com",
    storePhone: "02-1234-5678",
    storeAddress: "서울특별시 강남구 테헤란로 123",
    logoUrl: "/placeholder.svg",
    faviconUrl: "/placeholder.svg",
    currencyCode: "KRW",
    weightUnit: "kg",
    dimensionUnit: "cm",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enableBankTransfer: true,
    enableVirtualAccount: true,
    enableMobilePayment: true,
    creditCardFee: 0,
    bankTransferFee: 0,
    virtualAccountFee: 0,
    mobilePaymentFee: 0,
  })

  const [shippingSettings, setShippingSettings] = useState({
    defaultShippingFee: 3000,
    freeShippingThreshold: 50000,
    enableInternationalShipping: false,
    internationalShippingFee: 25000,
    shippingOrigin: "서울특별시 강남구",
    estimatedDeliveryDays: "2-3",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableOrderConfirmation: true,
    enableShippingNotification: true,
    enableDeliveryNotification: true,
    enableMarketingEmails: true,
    enableSmsNotifications: true,
    adminOrderNotification: true,
    lowStockNotification: true,
    lowStockThreshold: 10,
  })

  const handleSaveSettings = () => {
    // 실제로는 API 호출을 통해 설정을 저장
    alert("설정이 저장되었습니다.")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">설정</h2>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          모든 설정 저장
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="payment">결제</TabsTrigger>
          <TabsTrigger value="shipping">배송</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
              <CardDescription>스토어의 기본 정보를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">스토어 이름</Label>
                  <Input
                    id="storeName"
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, storeName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">이메일</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, storeEmail: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">전화번호</Label>
                  <Input
                    id="storePhone"
                    value={generalSettings.storePhone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, storePhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">주소</Label>
                  <Input
                    id="storeAddress"
                    value={generalSettings.storeAddress}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, storeAddress: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label>로고</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={generalSettings.logoUrl || "/placeholder.svg"}
                        alt="Store Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      로고 변경
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>파비콘</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                      <Image
                        src={generalSettings.faviconUrl || "/placeholder.svg"}
                        alt="Favicon"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      파비콘 변경
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currencyCode">통화</Label>
                  <Select
                    value={generalSettings.currencyCode}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, currencyCode: value })}
                  >
                    <SelectTrigger id="currencyCode">
                      <SelectValue placeholder="통화 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KRW">한국 원 (₩)</SelectItem>
                      <SelectItem value="USD">미국 달러 ($)</SelectItem>
                      <SelectItem value="JPY">일본 엔 (¥)</SelectItem>
                      <SelectItem value="EUR">유로 (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightUnit">무게 단위</Label>
                  <Select
                    value={generalSettings.weightUnit}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, weightUnit: value })}
                  >
                    <SelectTrigger id="weightUnit">
                      <SelectValue placeholder="무게 단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">킬로그램 (kg)</SelectItem>
                      <SelectItem value="g">그램 (g)</SelectItem>
                      <SelectItem value="lb">파운드 (lb)</SelectItem>
                      <SelectItem value="oz">온스 (oz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensionUnit">크기 단위</Label>
                  <Select
                    value={generalSettings.dimensionUnit}
                    onValueChange={(value) => setGeneralSettings({ ...generalSettings, dimensionUnit: value })}
                  >
                    <SelectTrigger id="dimensionUnit">
                      <SelectValue placeholder="크기 단위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">센티미터 (cm)</SelectItem>
                      <SelectItem value="m">미터 (m)</SelectItem>
                      <SelectItem value="in">인치 (in)</SelectItem>
                      <SelectItem value="ft">피트 (ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO 설정</CardTitle>
              <CardDescription>검색 엔진 최적화를 위한 설정입니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">메타 타이틀</Label>
                <Input id="metaTitle" defaultValue="ASOS Style Shop - 패션 의류 쇼핑몰" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">메타 설명</Label>
                <Textarea
                  id="metaDescription"
                  defaultValue="최신 트렌드의 패션 아이템을 만나보세요. 당신의 스타일을 완성시켜 드립니다."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">메타 키워드</Label>
                <Input id="metaKeywords" defaultValue="패션, 의류, 쇼핑몰, 스타일, 트렌드" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>결제 설정</CardTitle>
              <CardDescription>결제 방법 및 수수료를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="enableCreditCard">신용카드 결제</Label>
                  </div>
                  <Switch
                    id="enableCreditCard"
                    checked={paymentSettings.enableCreditCard}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, enableCreditCard: checked })}
                  />
                </div>

                {paymentSettings.enableCreditCard && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="creditCardFee">수수료 (%)</Label>
                    <Input
                      id="creditCardFee"
                      type="number"
                      value={paymentSettings.creditCardFee}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, creditCardFee: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="enableBankTransfer">계좌이체</Label>
                  </div>
                  <Switch
                    id="enableBankTransfer"
                    checked={paymentSettings.enableBankTransfer}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, enableBankTransfer: checked })
                    }
                  />
                </div>

                {paymentSettings.enableBankTransfer && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="bankTransferFee">수수료 (%)</Label>
                    <Input
                      id="bankTransferFee"
                      type="number"
                      value={paymentSettings.bankTransferFee}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, bankTransferFee: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="enableVirtualAccount">가상계좌</Label>
                  </div>
                  <Switch
                    id="enableVirtualAccount"
                    checked={paymentSettings.enableVirtualAccount}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, enableVirtualAccount: checked })
                    }
                  />
                </div>

                {paymentSettings.enableVirtualAccount && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="virtualAccountFee">수수료 (%)</Label>
                    <Input
                      id="virtualAccountFee"
                      type="number"
                      value={paymentSettings.virtualAccountFee}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, virtualAccountFee: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <Label htmlFor="enableMobilePayment">모바일 결제</Label>
                  </div>
                  <Switch
                    id="enableMobilePayment"
                    checked={paymentSettings.enableMobilePayment}
                    onCheckedChange={(checked) =>
                      setPaymentSettings({ ...paymentSettings, enableMobilePayment: checked })
                    }
                  />
                </div>

                {paymentSettings.enableMobilePayment && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="mobilePaymentFee">수수료 (%)</Label>
                    <Input
                      id="mobilePaymentFee"
                      type="number"
                      value={paymentSettings.mobilePaymentFee}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, mobilePaymentFee: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PG 설정</CardTitle>
              <CardDescription>결제 대행사(PG) 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pgProvider">PG사</Label>
                <Select defaultValue="inicis">
                  <SelectTrigger id="pgProvider">
                    <SelectValue placeholder="PG사 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicis">이니시스</SelectItem>
                    <SelectItem value="kcp">KCP</SelectItem>
                    <SelectItem value="nice">나이스페이</SelectItem>
                    <SelectItem value="toss">토스페이먼츠</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pgMerchantId">상점 아이디</Label>
                <Input id="pgMerchantId" placeholder="상점 아이디를 입력하세요" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pgApiKey">API 키</Label>
                <Input id="pgApiKey" type="password" placeholder="API 키를 입력하세요" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pgSecretKey">시크릿 키</Label>
                <Input id="pgSecretKey" type="password" placeholder="시크릿 키를 입력하세요" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>배송 설정</CardTitle>
              <CardDescription>배송 방법 및 비용을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultShippingFee">기본 배송비</Label>
                  <Input
                    id="defaultShippingFee"
                    type="number"
                    value={shippingSettings.defaultShippingFee}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, defaultShippingFee: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">무료 배송 기준 금액</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={(e) =>
                      setShippingSettings({
                        ...shippingSettings,
                        freeShippingThreshold: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableInternationalShipping"
                  checked={shippingSettings.enableInternationalShipping}
                  onCheckedChange={(checked) =>
                    setShippingSettings({ ...shippingSettings, enableInternationalShipping: checked })
                  }
                />
                <Label htmlFor="enableInternationalShipping">해외 배송 활성화</Label>
              </div>

              {shippingSettings.enableInternationalShipping && (
                <div className="space-y-2">
                  <Label htmlFor="internationalShippingFee">해외 배송비</Label>
                  <Input
                    id="internationalShippingFee"
                    type="number"
                    value={shippingSettings.internationalShippingFee}
                    onChange={(e) =>
                      setShippingSettings({
                        ...shippingSettings,
                        internationalShippingFee: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingOrigin">배송 출발지</Label>
                  <Input
                    id="shippingOrigin"
                    value={shippingSettings.shippingOrigin}
                    onChange={(e) => setShippingSettings({ ...shippingSettings, shippingOrigin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedDeliveryDays">예상 배송 기간 (일)</Label>
                  <Input
                    id="estimatedDeliveryDays"
                    value={shippingSettings.estimatedDeliveryDays}
                    onChange={(e) =>
                      setShippingSettings({ ...shippingSettings, estimatedDeliveryDays: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>택배사 설정</CardTitle>
              <CardDescription>사용할 택배사를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCourier">기본 택배사</Label>
                <Select defaultValue="cj">
                  <SelectTrigger id="defaultCourier">
                    <SelectValue placeholder="택배사 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cj">CJ대한통운</SelectItem>
                    <SelectItem value="logen">로젠택배</SelectItem>
                    <SelectItem value="hanjin">한진택배</SelectItem>
                    <SelectItem value="lotte">롯데택배</SelectItem>
                    <SelectItem value="post">우체국택배</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>사용 가능한 택배사</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="courier-cj" defaultChecked />
                    <Label htmlFor="courier-cj">CJ대한통운</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="courier-logen" defaultChecked />
                    <Label htmlFor="courier-logen">로젠택배</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="courier-hanjin" defaultChecked />
                    <Label htmlFor="courier-hanjin">한진택배</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="courier-lotte" defaultChecked />
                    <Label htmlFor="courier-lotte">롯데택배</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="courier-post" defaultChecked />
                    <Label htmlFor="courier-post">우체국택배</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>고객 알림 설정</CardTitle>
              <CardDescription>고객에게 보내는 알림을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <Label htmlFor="enableOrderConfirmation">주문 확인 이메일</Label>
                  </div>
                  <Switch
                    id="enableOrderConfirmation"
                    checked={notificationSettings.enableOrderConfirmation}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableOrderConfirmation: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <Label htmlFor="enableShippingNotification">배송 시작 알림</Label>
                  </div>
                  <Switch
                    id="enableShippingNotification"
                    checked={notificationSettings.enableShippingNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableShippingNotification: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <Label htmlFor="enableDeliveryNotification">배송 완료 알림</Label>
                  </div>
                  <Switch
                    id="enableDeliveryNotification"
                    checked={notificationSettings.enableDeliveryNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableDeliveryNotification: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <Label htmlFor="enableMarketingEmails">마케팅 이메일</Label>
                  </div>
                  <Switch
                    id="enableMarketingEmails"
                    checked={notificationSettings.enableMarketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableMarketingEmails: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <Label htmlFor="enableSmsNotifications">SMS 알림</Label>
                  </div>
                  <Switch
                    id="enableSmsNotifications"
                    checked={notificationSettings.enableSmsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, enableSmsNotifications: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>관리자 알림 설정</CardTitle>
              <CardDescription>관리자에게 보내는 알림을 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <Label htmlFor="adminOrderNotification">새 주문 알림</Label>
                  </div>
                  <Switch
                    id="adminOrderNotification"
                    checked={notificationSettings.adminOrderNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, adminOrderNotification: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="h-5 w-5" />
                    <Label htmlFor="lowStockNotification">재고 부족 알림</Label>
                  </div>
                  <Switch
                    id="lowStockNotification"
                    checked={notificationSettings.lowStockNotification}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, lowStockNotification: checked })
                    }
                  />
                </div>

                {notificationSettings.lowStockNotification && (
                  <div className="ml-7 space-y-2">
                    <Label htmlFor="lowStockThreshold">재고 부족 기준</Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={notificationSettings.lowStockThreshold}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          lowStockThreshold: Number.parseInt(e.target.value),
                        })
                      }
                    />
                    <p className="text-sm text-muted-foreground">재고가 이 수량 이하로 떨어지면 알림을 보냅니다.</p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="adminEmail">관리자 이메일</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@asosstyle.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPhone">관리자 전화번호</Label>
                <Input id="adminPhone" defaultValue="010-9876-5432" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
              <CardDescription>스토어의 보안 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <div>
                      <Label htmlFor="enableSsl">SSL 보안</Label>
                      <p className="text-sm text-muted-foreground">HTTPS를 통한 보안 연결 사용</p>
                    </div>
                  </div>
                  <Switch id="enableSsl" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <div>
                      <Label htmlFor="enableTwoFactor">2단계 인증</Label>
                      <p className="text-sm text-muted-foreground">관리자 로그인 시 2단계 인증 사용</p>
                    </div>
                  </div>
                  <Switch id="enableTwoFactor" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <div>
                      <Label htmlFor="enableLoginAttempts">로그인 시도 제한</Label>
                      <p className="text-sm text-muted-foreground">5회 이상 실패 시 계정 잠금</p>
                    </div>
                  </div>
                  <Switch id="enableLoginAttempts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="h-5 w-5" />
                    <div>
                      <Label htmlFor="enablePasswordExpiry">비밀번호 만료</Label>
                      <p className="text-sm text-muted-foreground">90일마다 비밀번호 변경 요청</p>
                    </div>
                  </div>
                  <Switch id="enablePasswordExpiry" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="passwordPolicy">비밀번호 정책</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="passwordPolicy">
                    <SelectValue placeholder="비밀번호 정책 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">기본 (최소 8자)</SelectItem>
                    <SelectItem value="medium">중간 (최소 8자, 숫자 포함)</SelectItem>
                    <SelectItem value="strong">강력 (최소 8자, 숫자, 특수문자 포함)</SelectItem>
                    <SelectItem value="very-strong">매우 강력 (최소 12자, 대소문자, 숫자, 특수문자 포함)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleSaveSettings()}>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>데이터 백업</CardTitle>
              <CardDescription>스토어 데이터 백업 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">백업 주기</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backupFrequency">
                    <SelectValue placeholder="백업 주기 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">매시간</SelectItem>
                    <SelectItem value="daily">매일</SelectItem>
                    <SelectItem value="weekly">매주</SelectItem>
                    <SelectItem value="monthly">매월</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupRetention">백업 보관 기간</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="backupRetention">
                    <SelectValue placeholder="보관 기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7일</SelectItem>
                    <SelectItem value="14">14일</SelectItem>
                    <SelectItem value="30">30일</SelectItem>
                    <SelectItem value="90">90일</SelectItem>
                    <SelectItem value="365">1년</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  수동 백업
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">데이터 초기화</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>데이터 초기화</AlertDialogTitle>
                      <AlertDialogDescription>
                        정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 상품, 주문, 고객
                        데이터가 영구적으로 삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">초기화</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

