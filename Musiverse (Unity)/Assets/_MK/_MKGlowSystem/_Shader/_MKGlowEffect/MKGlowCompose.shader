Shader "Hidden/MKGlowCompose" 
{
	Properties 
	{
		_MainTex ("", 2D) = "Black" {}
		_GlowTex ("", 2D) = "Black" {}
	}
	Subshader 
	{
		//Blend One Zero
		ZTest Always 
		Fog { Mode Off }
		//ColorMask RGB
		Cull Off
		Lighting Off
		ZWrite Off
		
		Pass 
		{
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			
			uniform sampler2D _MainTex : register (s0);
			uniform sampler2D _GlowTex;
			uniform float4 _GlowTex_TexelSize;
			struct Input
			{
				float4 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv[2] : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv[0] = i.texcoord;
				o.uv[1] = i.texcoord;
				return o;
			}

			fixed4 frag( Output i ) : SV_TARGET
			{
				//#if UNITY_UV_STARTS_AT_TOP
				//if (_GlowTex_TexelSize.y < 0)
			    //    i.uv[1].y = 1-i.uv[1].y;
				//#endif
				
				fixed d = (min(0,_GlowTex_TexelSize.y)/_GlowTex_TexelSize.y)*(1 - i.uv[1].y) + (max(0,_GlowTex_TexelSize.y)/_GlowTex_TexelSize.y)*(i.uv[1].y); //thanks to Jakob Thomsen / Ben Lindner
				
				i.uv[1].y = d;
				
				fixed4 g = tex2D( _MainTex, i.uv[0]);
				fixed4 g2 = tex2D(_GlowTex, i.uv[1]);
				g2 +=g;
				return g2;
			}
			ENDCG
		}
	}
	Fallback off
}