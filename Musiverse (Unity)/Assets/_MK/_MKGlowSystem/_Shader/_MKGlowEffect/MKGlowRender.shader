﻿Shader "Hidden/MKGlowRender"
{
	SubShader 
	{
		Tags { "RenderType"="MKGlow" "Queue"="Transparent"}		
		Pass 
		{
			ZTest Always 
			Fog { Mode Off }
			//ColorMask RGB
			Cull Back
			Lighting Off
			ZWrite On

			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			
			uniform sampler2D _MKGlowTex : register (s0);
			uniform float4 _MKGlowTex_ST;
			uniform fixed4 _MKGlowColor;
			uniform half _MKGlowPower;
			uniform half _MKGlowTexPower;
			uniform float _MKGlowOffSet;
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			
			struct Output 
			{
				float4 pos : POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				i.vertex.xyz += i.normal * _MKGlowOffSet;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : Color
			{
				fixed4 glow = tex2D(_MKGlowTex, i.uv.xy * _MKGlowTex_ST.xy + _MKGlowTex_ST.zw);
				glow *= (_MKGlowColor * _MKGlowPower);	
				return glow;
			}
			ENDCG
		}
	}
	SubShader 
	{
		Tags { "RenderType"="Opaque" }
		Pass 
		{
			Fog { Mode Off }
			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};
			
			struct Output 
			{
				float4 pos : POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : Color
			{
				return fixed4(0,0,0,0);
			}
			
			ENDCG
		}
	}
	SubShader 
	{
		Tags { "RenderType"="Transparent" }
		Pass 
		{
			Fog { Mode Off }
			Blend SrcAlpha OneMinusSrcAlpha
			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma multi_compile MKTRANSPARENT_ON MKTRANSPARENT_OFF
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};
			
			struct Output 
			{
				float4 pos : POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : Color
			{
				#if MKTRANSPARENT_OFF
				return fixed4(0,0,0,1);
				#elif MKTRANSPARENT_ON
				return fixed4(0,0,0,0);
				#endif
			}
			
			ENDCG
		}
	} 
	
	SubShader 
	{
		Tags { "RenderType"="TransparentCutout" }
		Pass 
		{
			Fog { Mode Off }
			Blend SrcAlpha OneMinusSrcAlpha
			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma multi_compile MKCUTOUT_ON MKCUTOUT_OFF
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};
			
			struct Output 
			{
				float4 pos : POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : Color
			{
				#if MKCUTOUT_OFF
				return fixed4(0,0,0,1);
				#elif MKCUTOUT_ON
				return fixed4(0,0,0,0);
				#endif
			}
			
			ENDCG
		}
	} 
} 

